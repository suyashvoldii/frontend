class Storage {
  static get authToken() {
    return this.getItem('gogo_token');
  }

  static set authToken(token) {
    console.log('token');
    this.setItem('gogo_token', token);
  }

  static get authUser() {
    return this.getItem('authUser');
  }

  static set authUser(authUser) {
    this.setItem('authUser', authUser);
  }

  static setItem(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log(
        '>>>>: src/helpers/storage.service.js  : getItem -> error',
        error
      );
    }
  }

  static getItem(key) {
    let item = null;
    try {
      item =
        localStorage.getItem(key) != null
          ? JSON.parse(localStorage.getItem(key))
          : null;
    } catch (error) {
      console.log(
        '>>>>: src/helpers/storage.service.js  : getItem -> error',
        error
      );
      item = null;
    }
    return item;
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}

export default Storage;
