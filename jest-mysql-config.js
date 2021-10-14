module.exports = {
    databaseOptions: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "123456",
      database: "categories"
    },
    createDatabase: true,
    dbSchema: "docker-entrypoint-initdb.d/setup.sql",
    truncateDatabase: false
  };