import React, { useEffect } from "react";
import {
    Paper,
    Typography,
    CircularProgress,
    Divider,
} from "@material-ui/core";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../actions/postActions";
import CommentSection from "./CommentSection";
const PostDetails = () => {
    const classes = useStyles();
    const { post, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { id } = useParams();

    //posts/:id
    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);
    // useEffect(() => {
    //     if (post) {
    //         dispatch(
    //             getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
    //         );
    //     }
    // }, [post, dispatch]);
    // const recommendPosts = posts?.filter((p) => p?._id !== post?._id);
    if (!post) {
        <Paper className={classes.loadingPaper} elevation={6}>
            <Typography variant="h6" component="h3">
                Post not found
            </Typography>
        </Paper>;
    }
    if (isLoading) {
        return (
            <Paper className={classes.loadingPaper} elevation={6}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }
    return (
        <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h4" component="h3">
                        {post?.title}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="h6"
                        color="textSecondary"
                        component="h3"
                    >
                        {post?.tags.map((tag) => `#${tag} `)}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {post?.message}
                    </Typography>
                    <Typography variant="h6">
                        Created by: {post?.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {moment(post?.createdAt).fromNow()}
                    </Typography>
                    <Divider style={{ margin: "20px 0" }} />
                    <CommentSection post={post} Ư />
                    <Divider style={{ margin: "20px 0" }} />
                </div>
                <div className={classes.imageSection}>
                    <img
                        className={classes.media}
                        src={
                            post?.selectedFile ||
                            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                        }
                        alt={post?.title}
                    />
                </div>
            </div>
            {/* RECOMMENT */}
            {/* {recommendPosts.length !== 0 && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">
                        You might also like:
                    </Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendPosts.map((p) => (
                            <div
                                className={classes.recommendedPost}
                                key={p._id}
                                onClick={() => navigate(`/posts/${p._id}`)}
                            >
                                <Typography variant="h6">{p.title}</Typography>
                                <Typography variant="subtitle2">
                                    {p.name}
                                </Typography>
                                <Typography variant="subtitle2">
                                    Likes: {p.likes.length}
                                </Typography>
                                <img
                                    src={p.selectedFile}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                    }}
                                    alt={p.title}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )} */}
        </Paper>
    );
};

export default PostDetails;
