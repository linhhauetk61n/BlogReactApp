const PostController = require("../app/controllers/PostController");
const verifyToken = require("../app/middleware/verifyToken");

const router = require("express").Router();

router.get("/search", PostController.getPostsBySearch);
router.get("/", PostController.getPosts);
router.get("/:id", PostController.getPost);
router.post("/comment/:id", verifyToken, PostController.commentPost);
router.post("/", verifyToken, PostController.createPost);
router.put("/like/:id", verifyToken, PostController.likePost);
router.put("/:id", verifyToken, PostController.updatePost);
router.delete("/:id", verifyToken, PostController.deletePost);

module.exports = router;
