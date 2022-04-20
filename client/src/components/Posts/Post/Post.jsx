import React, { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../../actions/postActions";
import { useNavigate } from "react-router-dom";
const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.authData);
    const handleDelete = () => {
        dispatch(deletePost(post._id));
    };
    const handleLike = () => {
        dispatch(likePost(post._id));
        if (hasLiked) {
            setLikes((prev) => prev - 1);
        } else {
            setLikes((prev) => prev + 1);
        }
        setHasLike(!hasLiked);
    };
    const navigate = useNavigate();
    const openPost = () => {
        navigate(`/posts/${post._id}`);
    };
    const [likes, setLikes] = useState(post?.likes.length);
    const [hasLiked, setHasLike] = useState(
        post.likes.find((like) => like === currentUser?._id)
    );
    const Likes = () => {
        if (likes > 0) {
            return hasLiked ? (
                <>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp;{" "}
                    {likes > 2
                        ? `You and ${likes - 1} orthers`
                        : `${likes} like${likes > 1 ? "s" : ""}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp; {likes} {likes === 1 ? "Like" : "Likes"}
                </>
            );
        }
        return (
            <>
                <ThumbUpAltOutlined fontSize="small" />
                &nbsp; Like
            </>
        );
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            <CardMedia
                className={classes.media}
                image={post.selectedFile}
                title={post.title}
            />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>
            {currentUser?._id === post.creator && (
                <div className={classes.overlay2}>
                    <Button
                        style={{ color: "white" }}
                        size="small"
                        onClick={() => setCurrentId(post._id)}
                    >
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <div className={classes.details}>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="h2"
                    >
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>
                <Typography
                    className={classes.title}
                    variant="h5"
                    gutterBottom
                    component="h2"
                >
                    {post.title}
                </Typography>
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        gutterBottom
                    >
                        {post.message}
                    </Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button
                    size="small"
                    disabled={!currentUser}
                    color="primary"
                    onClick={handleLike}
                >
                    <Likes />
                </Button>
                <Button
                    size="small"
                    disabled={currentUser?._id !== post.creator}
                    color="primary"
                    onClick={handleDelete}
                >
                    <DeleteIcon fontSize="small" />
                    &nbsp; Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;
