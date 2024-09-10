const express = require('express');
const router = express.Router();
const { create_post, showAllPosts, update_post, delete_post, get_post_by_id } = require('../controllers/postController');
const auth = require('../middleware/auth'); 

router.post('/create_post', auth, create_post);

router.get('/showAllPosts', showAllPosts);

router.get('/get_post_by_id/:id', get_post_by_id);

router.put('/update_post/:id', auth, update_post);

router.delete('/delete_post/:id', auth, delete_post);

module.exports = router;
