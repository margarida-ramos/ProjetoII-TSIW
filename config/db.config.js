const config = {
    /* don't expose password or any sensitive info, done only for demo */
    // if environment variables are not defined, use default values
    HOST: process.env.DB_HOST || 'sql106.epizy.com',
    USER: process.env.DB_USER || 'epiz_28408068',
    PASSWORD: process.env.DB_PASSWORD || 'Margarida7',
    DB: process.env.DB_NAME || 'epiz_28408068_projetoII'
};

module.exports = config;