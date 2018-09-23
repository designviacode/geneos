import { EventEmitter } from 'events';

class UserStore extends EventEmitter {
  profile = 
  {
    "publicKey": "EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58",
    "privateKey": "5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7",
    "name": "Jens"
  };

  setUser(profile) {
    this.profile = profile;
    this.emit('change', profile);
  }

  getUser() {
    return this.profile;
  }
}

export default new UserStore();
