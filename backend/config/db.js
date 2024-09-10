const {Pool} =require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool=new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
});

pool.connect((err)=>{
    if(err){
        console.log("Database connection error: ",err.stack);
    }
    else{
        console.log("Connected succefully to the PostgreSQL database.");
    }
});

module.exports = pool;