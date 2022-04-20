import React, { useState } from "react";
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
// import Icon from "./Icon";
// import { GoogleLogin } from "react-google-login";
const Auth = () => {
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const switchMode = () => {
        setIsSignup(!isSignup);
        setShowPassword(false);
    };
    // const googleSuccess = (res) => {
    //     console.log(res);
    // };
    // const googleFailure = () => {
    //     console.log("Google sign in was unsuccessful. Try it again later");
    // };
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            if (formData.password !== formData.confirmPassword) {
                console.log("Password don't match");
            } else {
                dispatch(signUp(formData, navigate));
            }
        } else {
            dispatch(signIn(formData, navigate));
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignup ? "Sign Up" : "Sign In"}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                    type="text"
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                    type="text"
                                />
                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignup && (
                            <Input
                                name="confirmPassword"
                                label="Confirm Password"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword}
                            />
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    {/* <GoogleLogin
                        clientId="377740241707-qtnoo1t9g9kh5fnjqgme7pu7vpgd80s9.apps.googleusercontent.com"
                        render={(renderProps) => {
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fillWidth
                                onClick={renderProps.onClick}
                                disable={renderProps.disable}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>;
                        }}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup
                                    ? "Already have an account? Sign In"
                                    : "Don't have an account? Sign Up "}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
