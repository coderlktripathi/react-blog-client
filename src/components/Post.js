import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


import { withStyles } from '@material-ui/styles'
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core'

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

const image = 'https://raw.githubusercontent.com/hidjou/classsed-react-firebase-client/master/public/icon.png';

export class Post extends PureComponent {

    render() {
        const { classes, post: { body, user, _created } } = this.props;

        dayjs.extend(relativeTime);

        return (
            <Card className={classes.card}>
                <CardMedia
                    image={image}
                    title="Proifle"
                    className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5"
                        component={Link}
                        to={`/users/${user}`}
                        color="primary">{user}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(_created).fromNow()}</Typography>
                    <Typography variant="body1" color="textPrimary">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Post)
