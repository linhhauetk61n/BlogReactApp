const Post = require("../models/Post");

class PostController {
    async getPosts(req, res) {
        const page = req.query.page;
        try {
            const LIMIT = 4;
            //get the starting index of every page
            const startIndex = (Number(page) - 1) * LIMIT;
            const total = await Post.countDocuments({});
            const posts = await Post.find()
                .sort({ createdAt: -1 })
                .limit(LIMIT)
                .skip(startIndex);

            return res.status(200).json({
                success: true,
                posts,
                currentPage: Number(page),
                numberOfPage: Math.ceil(total / LIMIT),
            });
        } catch (error) {
            return res.status(404).json({ success: false, message: error });
        }
    }
    async getPost(req, res) {
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            return res.status(200).json({
                success: true,
                post,
            });
        } catch (error) {
            return res.status(404).json({ success: false, message: error });
        }
    }
    async getPostsBySearch(req, res) {
        const { searchQuery, tags } = req.query;
        try {
            const title = new RegExp(searchQuery, "i");
            //search for title or tags
            const posts = await Post.find({
                $or: [{ title }, { tags: { $in: tags.split(",") } }],
            });

            return res.status(200).json({ success: true, posts });
        } catch (error) {
            return res.status(404).json({ success: false, message: error });
        }
    }
    async createPost(req, res) {
        try {
            const newPost = new Post({ ...req.body, creator: req.userId });
            await newPost.save();
            return res.status(201).json({ success: true, post: newPost });
        } catch (error) {
            return res.status(409).json({ success: false, message: error });
        }
    }
    async updatePost(req, res) {
        try {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            return res.status(201).json({ success: true, post: updatedPost });
        } catch (error) {
            return res.status(409).json({ success: false, message: error });
        }
    }
    async commentPost(req, res) {
        const { cmt } = req.body;

        try {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { comments: cmt },
                },
                {
                    new: true,
                }
            );
            return res.status(201).json({ success: true, post: updatedPost });
        } catch (error) {
            return res.status(409).json({ success: false, message: error });
        }
    }
    async deletePost(req, res) {
        try {
            await Post.findByIdAndDelete(req.params.id);
            return res
                .status(201)
                .json({ success: true, message: "Post deleted successfully" });
        } catch (error) {
            return res.status(409).json({ success: false, message: error });
        }
    }
    async likePost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post.likes.includes(req.userId)) {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $push: { likes: req.userId },
                    },
                    { new: true }
                );
                return res.status(201).json({
                    success: true,
                    post: updatedPost,
                    message: "Post has been liked successfully",
                });
            } else {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $pull: { likes: req.userId },
                    },
                    { new: true }
                );
                return res.status(201).json({
                    success: true,
                    post: updatedPost,
                    message: "Post has been disliked successfully",
                });
            }
        } catch (error) {
            return res.status(409).json({ success: false, message: error });
        }
    }
}
module.exports = new PostController();
