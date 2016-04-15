var config = {
  // mongoUri: 'mongodb://localhost:27017/rtr',   //rtr (optional-ish) is for DB 'restaurant-to-room'
  cookieMaxAge: 30*24*3600*1000, 
  deliveryID: 'NGU5NzA4ZTdiYjkwMGQxMGM4ZTE5MjIzZWRlOTUxM2Q0',  //really delivery Client ID
  deliveryKey: 'mOhBPZS7FvD0Y6CXm8STu3G20GP31bj9H2OEo28w',  //really delivery.com, secret
  hotelAddress: {
    method: 'delivery',
    address: '542 E. 79th St, 10075'
  }
};

config.mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/rtr';


module.exports = config;