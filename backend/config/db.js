import pkg from 'pg'; 
const { Pool } = pkg; 
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false 
    }
});

export const connectDB = async () => {
    try {
        console.log('Connected to PostgreSQL database');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); 
    }
};

export default pool;
