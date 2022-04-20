import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../actions/postActions";

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);

    const [cmt, setCmt] = useState("");
    const currentUser = useSelector((state) => state.user.authData);
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const handleComment = async () => {
        const finallyComment = `${currentUser.name}: ${cmt}`;
        const newComment = await dispatch(
            commentPost(finallyComment, post._id)
        );
        setComments(newComment);
        setCmt("");
        commentsRef.current.scrollIntoView();
    };

    return (
        <>
            <div className={classes.commentsOuterContainer}>
                <div
                    className={classes.commentsInnerContainer}
                    style={{ width: "50%" }}
                >
                    <Typography gutterBottom variant="h6">
                        <strong> Comments</strong>
                    </Typography>
                    <div className={classes.commentsContainer}>
                        {!comments?.length && (
                            <Typography guttterBottom variant="subtitle2">
                                No comments
                            </Typography>
                        )}
                        {comments?.map((cmt, i) => (
                            <Typography
                                key={i}
                                guttterBottom
                                variant="subtitle2"
                            >
                                <strong>{cmt.split(": ")[0] + ": "}</strong>
                                {cmt.split(": ")[1]}
                            </Typography>
                        ))}
                        <div ref={commentsRef} />
                    </div>
                </div>
                {currentUser && (
                    <div style={{ width: "50%" }}>
                        <Typography gutterBottom variant="h6">
                            Write a comment
                        </Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={cmt}
                            onChange={(e) => setCmt(e.target.value)}
                        />
                        <Button
                            style={{ marginTop: "10px" }}
                            fullWidth
                            disabled={!cmt}
                            variant="contained"
                            onClick={handleComment}
                            color="primary"
                        >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CommentSection;
