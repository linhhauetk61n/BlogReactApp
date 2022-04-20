import React from "react";
import { Grid, CircularProgress, Paper, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";
const Posts = ({ setCurrentId }) => {
    //posts => {isFetching, posts[], currentPage, numberOfpage}
    const { posts, isLoading } = useSelector((state) => state.posts);

    const classes = useStyles();
    if (!posts.length && !isLoading)
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    No posts!
                </Typography>
            </Paper>
        );
    return isLoading ? (
        <CircularProgress
            style={{ position: "fixed", top: "40%", left: "30%" }}
        />
    ) : (
        <Grid
            className={classes.container}
            container
            alignItems="stretch"
            spacing={3}
        >
            {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={6}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
