import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    media: {
        borderRadius: "20px",
        objectFit: "cover",
        width: "100%",
        maxHeight: "400px",
        maxWidth: "500px",
    },
    card: {
        display: "flex",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            flexWrap: "wrap",
            flexDirection: "column",
        },
    },
    section: {
        borderRadius: "20px",
        margin: "10px",
        flex: 1,
    },
    imageSection: {
        marginLeft: "20px",
        [theme.breakpoints.down("sm")]: {
            marginLeft: 0,
        },
    },
    recommendedPosts: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
    recommendedPost: {
        boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
        display: "flex",
        maxWidth: "200px",
        marginRight: "15px",
        flexDirection: "column",
        padding: "10px 40px",
        borderRadius: "5px",
    },
    loadingPaper: {
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        padding: "20px",
        borderRadius: "15px",
        height: "39vh",
    },
    commentsOuterContainer: {
        display: "flex",
        justifyContent: "space_between",
    },
    commentsInnerContainer: {
        display: "flex",
        flexDirection: "column",
    },
    commentsContainer: {
        height: "180px",
        overflowY: "auto",
        marginRight: "30px",
        display: "flex",
        flexDirection: "column",
    },
}));
