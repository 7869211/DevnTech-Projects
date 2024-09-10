const pool = require('../config/db');

const createPost = async (title, content, authorId, status = 'draft') => {
    const query = `
        INSERT INTO posts (title, content, author_id, status) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *;
    `;
    const values = [title, content, authorId, status];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
};

const getAllPosts = async () => {
    const query = `SELECT * FROM posts`;

    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
};

const getPostById = async (id) => {
    const query = `SELECT * FROM posts WHERE id = $1`;

    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
};

const updatePost = async (id, title, content, authorId, status) => {
    const query = `
        UPDATE posts
        SET title = $1, content = $2, status = $3, updated_at = NOW()
        WHERE id = $4 AND author_id = $5
        RETURNING *;
    `;
    const values = [title, content, status, id, authorId];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
};

const deletePost = async (id, authorId) => {
    const query = `
        DELETE FROM posts
        WHERE id = $1 AND author_id = $2
        RETURNING *;
    `;
    const values = [id, authorId];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,  
    updatePost,
    deletePost
};
