const express = require('express');
const router = express.Router();

// Sample data for posts
const posts = [
    { id: 1, title: 'Post 1', content: 'This is the first post.' },
    { id: 2, title: 'Post 2', content: 'This is the second post.' },
    { id: 3, title: 'Post 3', content: 'This is the third post.' },
];

// Route to get all posts
router.get('/', (req, res) => {
    res.json(posts);
});

// Route to get a specific post by ID
router.get('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find((p) => p.id === postId);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// Route to create a new post
router.post('/', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: posts.length + 1, title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Route to delete a post by ID
router.delete('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex((p) => p.id === postId);

    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        res.json({ message: 'Post deleted' });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

module.exports = router;
