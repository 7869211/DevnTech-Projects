const postModel = require('../models/postModel');

exports.create_post = async (req, res) => {
    try {
        const { title, content, status } = req.body;  
        const authorId = req.user?.id; 
        if (!authorId) {
            return res.status(400).json({ message: 'User not authenticated' });
        }

        const newPost = await postModel.createPost(title, content, authorId, status || 'draft');
        if (newPost) {
            return res.status(201).json(newPost);
        }
        res.status(400).json({ message: 'Failed to create post' });
    } catch (err) {
        console.error("Error in creating post:", err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.showAllPosts = async (req, res) => {
    try {
        const allPosts = await postModel.getAllPosts();
        if (allPosts.length > 0) {
            return res.status(200).json(allPosts);
        }
        res.status(404).json({ message: 'No posts found' });
    } catch (err) {
        console.error("Error in fetching all posts:", err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.get_post_by_id = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await postModel.getPostById(postId);

        if (post) {
            return res.status(200).json(post);
        }
        res.status(404).json({ message: 'Post not found' });
    } catch (err) {
        console.error("Error in fetching post by ID:", err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.update_post = async (req, res) => {
    const { title, content, status } = req.body; 
    const postId = req.params.id;        
    const authorId = req.user?.id;    

    try {
        const post = await postModel.getPostById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        else if (post.author_id !== authorId) {
            return res.status(403).json({ message: "You are not authorized to edit this post." });
        }

        const updatedPost = await postModel.updatePost(postId, title, content, authorId,status);

        res.status(200).json(updatedPost);
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Delete a post
exports.delete_post = async (req, res) => {
    const postId = req.params.id;        
    const authorId = req.user.id;        

    try {
        const deletedPost = await postModel.deletePost(postId, authorId);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found or you're not authorized to delete this post." });
        }

        res.status(200).json({ message: "Post deleted successfully", deletedPost });
    } catch (err) {
        console.log("Error found in delete:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
