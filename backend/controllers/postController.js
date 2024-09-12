const postModel = require('../models/postModel');

exports.createPost = async (req, res) => {
    try {
        const { title, content, status = 'draft' } = req.body;
        const authorId = req.user?.id;

        if (!authorId) {
            return res.status(400).json({ message: 'User not authenticated' });
        }

        const newPost = await postModel.createPost(title, content, authorId, status);
        res.status(201).json(newPost);
    } catch (err) {
        console.error("Error creating post:", err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const allPosts = await postModel.getAllPosts();
        res.status(200).json(allPosts);
    } catch (err) {
        console.error("Error fetching posts:", err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await postModel.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (err) {
        console.error("Error fetching post by ID:", err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { title, content, status } = req.body;
        const postId = req.params.id;
        const authorId = req.user?.id;

        const post = await postModel.getPostById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        if (post.author_id !== authorId) {
            return res.status(403).json({ message: "You are not authorized to edit this post." });
        }

        const updatedPost = await postModel.updatePost(postId, title, content, status);
        res.status(200).json(updatedPost);
    } catch (err) {
        console.error("Error updating post:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.user?.id;

        const deletedPost = await postModel.deletePost(postId, authorId);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found or you're not authorized to delete this post." });
        }

        res.status(200).json({ message: "Post deleted successfully", deletedPost });
    } catch (err) {
        console.error("Error deleting post:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
