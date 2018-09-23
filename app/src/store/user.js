import { EventEmitter } from 'events';

class UserStore extends EventEmitter {
  profile = null;

  setUser(profile) {
    this.profile = profile;
    this.emit('change', profile);
  }

  getUser() {
    return this.profile;
  }
}

export default new UserStore();
