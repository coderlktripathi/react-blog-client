import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppIcon from '../images/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    ...theme.commomStyles
});


class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const userData = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post('http://localhost:5000/api/auth/login', userData).then(({ data }) => {
            debugger
            this.props.history.push('/');
            localStorage.setItem('loginData', JSON.stringify(data));
            console.log(data)
        }).catch(({ response }) => {
            this.setState({ errors: response.data })
        }).finally(() => {
            this.setState({ loading: false });
        });
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="app logo" className={classes.image} />
                    <Typography variant="h5" className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="username"
                            name="username"
                            type="text"
                            label="User Name"
                            value={this.state.username}
                            className={classes.textField}
                            helperText={errors.username}
                            error={errors.username ? true : false}
                            onChange={this.handleChange} fullWidth />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            value={this.state.password}
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={this.handleChange} fullWidth />
                        {errors.message &&
                            <Typography variant="body2" className={classes.customError}>{errors.message}</Typography>
                        }
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Login
                            {loading && <CircularProgress className={classes.progress} />}
                        </Button>
                    </form>
                    <small>Don't have account? Signup <Link to="/signup">here.</Link></small>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)
