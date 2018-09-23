#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/transaction.hpp>
#include <string>

namespace eosio {
   using eosio::asset;
   using std::string;

   typedef uint64_t id_type;
   typedef string uri_type;

   class marketplace : public eosio::contract {
      public:
         marketplace( account_name s ) : contract( s ), _listings( s, s ), _offers( s, s ), _txs( s, s ) {}

         /// @abi action
         void list( account_name lister, id_type tokenid, string metadata) {

            require_auth( lister );

            auto tokens = token_index(N(data.nft), N(data.nft));

            auto itr = tokens.find(tokenid);

            account_name owner = itr->owner;

            eosio_assert(owner == lister, "lister does not own this token");


            _listings.emplace( lister, [&]( auto& listing ) {
               listing.tokenid = tokenid;
               listing.metadata = metadata;
            });
         }

         /// @abi action
         void makeoffer( account_name from, id_type id, asset price, string metadata ) {
            require_auth(from);

            eosio_assert(price.is_valid(), "invalid price");
            eosio_assert(price.amount > 0, "offer price must be positive");

            _offers.emplace( from, [&]( auto& offer ) {
               offer.id = _offers.available_primary_key();
               offer.reftokenid    = id;
               offer.from    = from;
               offer.price = price;
               offer.metadata = metadata;
            });
         }

         /// @abi action
         void acceptoffer( account_name seller, id_type offerid ) {
            require_auth(seller);
            
            auto offer = _offers.find( offerid );

            id_type tokenid = offer->reftokenid;
            asset price = offer->price;
            account_name buyer = offer->from;
            string metadata = offer->metadata;

            action subscribe = action(
               permission_level{get_self(),N(active)},
               N(data.nft),
               N(subscribe),
               std::make_tuple(get_self(), buyer, tokenid, metadata)
            );


            subscribe.send();

            action payment = action(
               permission_level{buyer,N(active)},
               N(eosio.token),
               N(transfer),
               std::make_tuple(buyer, seller, price, std::string("sending payment for data subscription"))
            );


            payment.send();

            // add to transaction records
            _txs.emplace( _self, [&]( auto& tx ) {
               tx.id = _txs.available_primary_key();
               tx.reftokenid = tokenid;
               tx.subscriber = buyer;
               tx.seller = seller;
               tx.price = price;
            });

            // delete the offer
            _offers.erase(offer);
         }

      private:
         // Setup the struct that represents a row in the table
         /// @abi table listings
         struct listing {
            id_type      tokenid; // primary key
            string  metadata;
            uint64_t primary_key() const { return tokenid; }
            string by_metadata() const    { return metadata; }
         };

         typedef eosio::multi_index< N(listings), listing > listing_table;

         // Creating the instance of the `listing_table` type
         listing_table _listings;

         /// @abi table offers
         struct offer {
            id_type       id; // primary key
            id_type       reftokenid; // links to listing's token id
            account_name  from;
            asset  price;
            string  metadata;
            uint64_t primary_key() const { return id; }
            uint64_t by_reftokenid() const    { return reftokenid; }
         };

         typedef eosio::multi_index< N(offers), offer,
            eosio::indexed_by<N(byreftokenid), eosio::const_mem_fun<offer, uint64_t, &offer::by_reftokenid> >
         > offer_table;

         // Creating the instance of the `offer_table` type
         offer_table _offers;

         // @abi table txs
         struct tx {
            id_type id;
            id_type reftokenid;
            account_name subscriber;
            account_name seller;
            asset price;
            uint64_t primary_key() const { return id; }
         };

         typedef eosio::multi_index< N(txs), tx > tx_table;

         // Creating the instance of the `tx_table` type
         tx_table _txs;

         // duplicating nft token
         struct token {
            id_type id;          // Unique 64 bit identifier,
            uri_type uri;        // RFC 3986
            account_name owner;  // token owner
            account_name spender;
            asset value;         // token value (1 SYS)
            std::string name;	 // token name
            std::string metadata; // metadata
            vector<account_name> subscribers;

            id_type primary_key() const { return id; }
            account_name get_owner() const { return owner; }
            uint64_t get_symbol() const { return value.symbol.name(); }
            uint64_t get_name() const { return string_to_name(name.c_str()); }
         };

         using token_index = eosio::multi_index<N(token), token,
                           indexed_by< N( byowner ), const_mem_fun< token, account_name, &token::get_owner> >,
                           indexed_by< N( bysymbol ), const_mem_fun< token, uint64_t, &token::get_symbol> >,
                           indexed_by< N( byname ), const_mem_fun< token, uint64_t, &token::get_name> > >;

   };

   EOSIO_ABI( marketplace, (list)(makeoffer)(acceptoffer) )

} // namespace eos