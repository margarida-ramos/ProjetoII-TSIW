const config = {
    /* don't expose password or any sensitive info, done only for demo */
    // if environment variables are not defined, use default values
    HOST: process.env.DB_HOST || 'sql106.epizy.com',
    USER: process.env.DB_USER || 'epiz_28408068',
    PASSWORD: process.env.DB_PASSWORD || 'Margarida7',
    DB: process.env.DB_NAME || 'epiz_28408068_projetoII'

    ,
    dialect: "mysql",
    // pool is optional, it will be used for Sequelize connection pool configuration
    pool: {
        max: 5,   //maximum number of connections in pool
        min: 0,   //minimum number of connections in pool
        acquire: 30000,     //maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000    //maximum time, in milliseconds, that a connection can be idle before being released
    }
};

module.exports = config;