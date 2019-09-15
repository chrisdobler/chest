/* tslint:disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import Quickview from './QuickviewContainer';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const items = [
  {
    primary: 'Photos',
    secondary: 'Jan 9, 2014',
    image: '/static/images/avatar/1.jpg'
  },
  {
    primary: 'Photos',
    secondary: 'Jan 9, 2014',
    image: '/static/images/avatar/1.jpg'
  },
  {
    primary: 'Photos',
    secondary: 'Jan 9, 2014',
    image: '/static/images/avatar/1.jpg'
  },
  {
    primary: 'Photos',
    secondary: 'Jan 9, 2014',
    image: '/static/images/avatar/1.jpg'
  },
  {
    primary: 'Photos',
    secondary: 'Jan 9, 2014',
    image: '/static/images/avatar/1.jpg'
  },
  {
    primary: 'Photos',
    secondary: 'Jan 9, 2014',
    image: '/static/images/avatar/1.jpg'
  },
  {
    primary: 'Photos',
    secondary: 'Jan 9, 2014',
    image: '/static/images/avatar/1.jpg'
  },
  {
    primary: 'Photos',
    secondary: 'Jan 9, 2014',
    image: '/static/images/avatar/1.jpg'
  },
  {
    primary: 'Photos',
    secondary: 'Jan 9, 2014',
    image: '/static/images/avatar/1.jpg'
  },
  {
    primary: 'Photos',
    secondary: 'Jan 9, 2014',
    image: '/static/images/avatar/1.jpg'
  },
  {
    primary: 'Photos',
    secondary: 'Jan 9, 2014',
    image: '/static/images/avatar/1.jpg'
  }
];

function InventoryList(props: { classes: object }) {
  const { classes } = props;
  return (
    <div>
      <Quickview />
      <List className={classes.root}>
        {items.map(({ id, image, primary, secondary }) => (
          <Link to={`/items/${id}`}>
            <ListItem>
              <Avatar alt="Remy Sharp" src={image} />
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
}

InventoryList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InventoryList);
