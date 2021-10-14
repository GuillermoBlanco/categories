module.exports = { 
    HOST: process.env.DB_HOST || "localhost",
    USER: "root",
    PASSWORD: "123456",
    DB: "categories",
    PORT: process.env.MYSQLDB_DOCKER_PORT || 3306
}