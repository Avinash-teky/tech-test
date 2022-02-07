import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.AWS_RDS_USERNAME,
    host: process.env.AWS_RDS_ENDPOINT,
    database: process.env.AWS_RDS_DB_NAME,
    password: process.env.AWS_RDS_PASSWORD,
    port: Number(process.env.AWS_RDS_PORT),
});

const checkConnection = async () => {
    const res = await pool.query('SELECT NOW()')
    console.log(res.rows[0]);
}

const closeConnection = async () => {
    await pool.end()
    console.log('connection closed');
}

const getClient = (callback) => {
    pool.connect((err, client, done) => {
        callback(err, client, done)
    })
}

const query = (text, params) => {
    return pool.query(text, params);
};

export {
    checkConnection,
    closeConnection,
    query,
    getClient
};