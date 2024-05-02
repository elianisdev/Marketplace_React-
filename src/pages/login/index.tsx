import React from "react";
import {Box, Container, Grid, Paper, Typography, TextField, Button} from "@mui/material";
import {useNotification} from "../../context/notification.context";
import {LoginValidate} from "../../utils/validateForm";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {login} from "../../redux/slices/auth.slice";
import {useNavigate} from "react-router-dom";


type LoginType = {
    username: string;
    password: string;
}
const LoginPage: React.FC <{}> = () => {
    const {getSuccess } = useNotification();
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const formik = useFormik<LoginType>({
        initialValues: {
        username: "",
        password: "",
        },
        validationSchema: LoginValidate,
        onSubmit: (values) => {
            dispatch(login());
            navigate("/");
            getSuccess(JSON.stringify(values));
        },
    });

    return (
        <Container maxWidth="sm">
           <Grid
               container
               direction="column"
               alignItems="center"
               justifyContent="center"
               sx={{ minHeight: '100vh' }}
           >
                <Grid item>
                  <Paper sx={{padding: "1.2em", borderRadius: "0.5em" }}>
                      <Typography variant="h4" align="center" sx={{mt:1, mb:1}}>Iniciar sesión</Typography>
                    <Box component="form" onSubmit={formik.handleSubmit}>
                            <TextField
                                name="username"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Email"
                                sx={{mt:2, mb:1.5}}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                            <TextField
                                name="password"
                                margin="normal"
                                type="password"
                                fullWidth
                                label="Password"
                                sx={{mt:1.5, mb:1.5}}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        <Button fullWidth type="submit" variant="contained" sx={{mt:1.5, mb:3}}>Iniciar Sesión</Button>
                    </Box>
                  </Paper>
                </Grid>
           </Grid>
        </Container>
    )
}

export default LoginPage;