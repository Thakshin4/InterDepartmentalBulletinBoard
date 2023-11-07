const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = new Post({ title, content, author: req.user._id });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Permission denied' });
        }

        await Post.findByIdAndRemove(postId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
