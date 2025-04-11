
module.exports = {
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: '1d'
  },
  database: {
    url: process.env.DATABASE_URL
  }
};
