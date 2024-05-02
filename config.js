const envfile = {
    dev: {
      PORT: process.env.PORT || 8200,
      SECERETKEY: process.env.SECERETKEY
    },
    stag: {
      PORT: process.env.PORT || 3300,
    },
    prod: {
      PORT: process.env.PORT || 3333,
    },
  };
  module.exports = envfile[process.env.NODE_ENV || 'dev'];