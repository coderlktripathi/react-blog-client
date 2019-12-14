import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import Post from '../components/Post';


class Home extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/posts').then(({data}) => {
            const posts = data._items;

            this.setState({posts});
        })
    }

    render() {
        let postMarkup = this.state.posts.map(post => <Post post={post} key={post._id}/>);
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {postMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile....</p>
                </Grid>
            </Grid>
        )
    }
}

export default Home
