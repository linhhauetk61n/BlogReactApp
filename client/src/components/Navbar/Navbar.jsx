import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import memoriesText from "../../images/memoriesText.png";
import memoriesLogo from "../../images/memoriesLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";

const Navbar = () => {
    const classes = useStyles();
    // const [user, setUser] = useState(
    //     JSON.parse(localStorage.getItem("memories_blog_app"))
    // );
    const user = useSelector((state) => state.user.authData);
    // useEffect(() => {
    //     const token = user?.accessToken;
    //     if (token) {
    //         const decodedToken = decode(token);
    //         console.log("Decode token", decodedToken);
    //     }
    //     // jwt
    //     setUser(JSON.parse(localStorage.getItem("memories_blog_app")));
    // }, []);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout(navigate));
        // setUser(null);
    };

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px" />
                <img
                    className={classes.image}
                    src={memoriesLogo}
                    alt="memories"
                    height="40px"
                />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user.name}
                            src={user.profileImg}
                        >
                            {user.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user.name}
                        </Typography>
                        <Button
                            className={classes.logout}
                            variant="contained"
                            color="secondary"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        className={classes.logout}
                        to="/auth"
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
