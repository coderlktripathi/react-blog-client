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


class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            confirmPassword: '',
            errors: {},
            firstname: '',
            lastname: '',
            loading: false,
            password: '',
            username: '',
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
        const newUserData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            dob: this.state.dob,
            username: this.state.username,
            password: this.state.password,
        };

        axios.post('http://localhost:5000/api/users', newUserData).then(({ data }) => {
            debugger
            this.props.history.push('/login');
            console.log(data)
        }).catch(({ response }) => {
            debugger
            this.setState({ errors: response.data._issues })
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
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="firstname"
                            name="firstname"
                            type="text"
                            label="First Name"
                            value={this.state.firstname}
                            className={classes.textField}
                            helperText={errors.firstname}
                            error={errors.firstname ? true : false}
                            onChange={this.handleChange} fullWidth />
                        <TextField
                            id="lastname"
                            name="lastname"
                            type="text"
                            label="Last Name"
                            value={this.state.lastname}
                            className={classes.textField}
                            helperText={errors.lastname}
                            error={errors.lastname ? true : false}
                            onChange={this.handleChange} fullWidth />
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
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            value={this.state.confirmPassword}
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            onChange={this.handleChange} fullWidth />
                        {errors.message &&
                            <Typography variant="body2" className={classes.customError}>{errors.message}</Typography>
                        }
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            SignUp
                            {loading && <CircularProgress className={classes.progress} />}
                        </Button>
                    </form>
                    <small>Already have an account? SignIn <Link to="/login">here.</Link></small>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignUp)
