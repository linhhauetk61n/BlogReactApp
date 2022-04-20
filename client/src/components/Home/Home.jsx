import React, { useState } from "react";
import {
    Grow,
    Container,
    Grid,
    Paper,
    AppBar,
    TextField,
    Button,
} from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import { getPostsBySearch } from "../../actions/postActions";
import { useDispatch } from "react-redux";
import Paginate from "../Pagination/Pagination";
import ChipInput from "material-ui-chip-input";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const Home = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get("page") || 1;
    const seachQuery = query.get("searchQuery");
    const seachTags = query.get("tags");

    const handleKeyPass = (e) => {
        if (e.keyCode === 13) {
            //search post
            handleSearch();
        }
    };

    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    };
    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };
    const handleSearch = () => {
        if (search.trim() || tags.length) {
            //dispatch => fetch search post
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
            navigate(
                `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(
                    ","
                )}`
            );
        } else {
            navigate("/");
        }
    };
    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId, dispatch]);
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid
                    className={classes.gridContainer}
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12} sm={6} md={8}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppBar
                            className={classes.appBarSearch}
                            position="static"
                            color="inherit"
                        >
                            <TextField
                                size="small"
                                name="search"
                                variant="outlined"
                                label="Seach Memories"
                                fullWidth
                                onKeyPress={handleKeyPass}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                size="small"
                                style={{ margin: "10px 0", height: "40px" }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search tags"
                                variant="outlined"
                            />
                            <Button
                                onClick={handleSearch}
                                variant="contained"
                                color="primary"
                            >
                                Search
                            </Button>
                        </AppBar>
                        <Form
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                        {!seachQuery && !seachTags && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Paginate page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
