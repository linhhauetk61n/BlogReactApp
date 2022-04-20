import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import Firebase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/postActions";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        selectedFile: null,
    });
    const currentUser = useSelector((state) => state.user.authData);
    const post = useSelector((state) =>
        currentId ? state.posts.posts.find((p) => p._id === currentId) : null
    );
    const navigate = useNavigate();
    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(
                updatePost(currentId, { ...postData, name: currentUser?.name })
            );
        } else {
            dispatch(
                createPost({ ...postData, name: currentUser?.name }, navigate)
            );
        }
        clear();
    };
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        });
    };
    if (!currentUser) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own memories and like other's
                    memories.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper}>
            <form
                autoComplete="off"
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">
                    {currentId ? "Editing" : "Creating"} a memories
                </Typography>

                <TextField
                    size="small"
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) =>
                        setPostData({ ...postData, title: e.target.value })
                    }
                />
                <TextField
                    size="small"
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) =>
                        setPostData({ ...postData, message: e.target.value })
                    }
                />
                <TextField
                    size="small"
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            tags: e.target.value.split(","),
                        })
                    }
                />
                <div className={classes.fileInput}>
                    <Firebase
                        type="file"
                        mutiple={false}
                        onDone={({ base64 }) =>
                            setPostData({ ...postData, selectedFile: base64 })
                        }
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
