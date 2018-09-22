#include <eosiolib/eosio.hpp>

class marketplace : public eosio::contract {
   public:
      marketplace( account_name s ):
         contract( s ),   // initialization of the base class for the contract
         _listings( s, s ) // initialize the table with code and scope NB! Look up definition of code and scope
      {
      }

      /// @abi action
      void create( account_name owner, uint32_t phone, const std::string& fullname, const std::string& address ) {

         require_auth( owner );

         // _listings.end() is in a way similar to null and it means that the value isn't found
         // uniqueness of primary key is enforced at the library level but we can enforce it in the contract with a
         // better error message
         eosio_assert( _listings.find( owner ) == _listings.end(), "This record already exists in the marketplace" );

         eosio_assert( fullname.size() <= 20, "Full name is too long" );
         eosio_assert( address.size() <= 50, "Address is too long" );

         // we use phone as a secondary key
         // secondary key is not necessarily unique, we will enforce its uniqueness in this contract
         auto idx = _listings.get_index<N(byphone)>();
         eosio_assert( idx.find( phone ) == idx.end(), "Phone number is already taken" );

         _listings.emplace( owner, [&]( auto& rcrd ) {
            rcrd.owner    = owner;
            rcrd.phone    = phone;
            rcrd.fullname = fullname;
            rcrd.address  = address;
         });
      }

      /// @abi action
      void remove( account_name owner ) {

         require_auth( owner );

         auto itr = _listings.find( owner );
         eosio_assert( itr != _listings.end(), "Record does not exit" );
         _listings.erase( itr );
      }

      /// @abi action
      void update( account_name owner, const std::string& address ) {

         require_auth( owner );

         auto itr = _listings.find( owner );
         eosio_assert( itr != _listings.end(), "Record does not exit" );
         eosio_assert( address.size() <= 50, "Address is too long" );
         _listings.modify( itr, owner, [&]( auto& rcrd ) {
            rcrd.address = address;
         });
      }

   private:
      // Setup the struct that represents a row in the table
      /// @abi table listings
      struct listing {
         account_name owner; // primary key
         uint32_t     phone;
         std::string  fullname;
         std::string  address;
         std::string  metadata;
         std::string  price;

         uint64_t primary_key() const { return owner; }
         uint64_t by_phone() const    { return phone; }
      };

      typedef eosio::multi_index< N(listings), listing,
         eosio::indexed_by<N(byphone), eosio::const_mem_fun<listing, uint64_t, &listing::by_phone> >
      > listing_table;

      // Creating the instance of the `listing_table` type
      listing_table _listings;
};

EOSIO_ABI( marketplace, (create)(remove)(update) )