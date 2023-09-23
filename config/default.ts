export default {
    port: 3001,
    dbUri: "mongodb://127.0.0.1:27017/stitch-api",
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y'
  };