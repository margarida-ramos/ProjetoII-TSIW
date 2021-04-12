const config = {
    /* don't expose password or any sensitive info, done only for demo */
    // if environment variables are not defined, use default values
    HOST: process.env.DB_HOST || 'sql11.freemysqlhosting.net',
    USER: process.env.DB_USER || 'sql11405168',
    PASSWORD: process.env.DB_PASSWORD || 'cdREA2i8sV',
    DB: process.env.DB_NAME || 'sql11405168'
};

module.exports = config;