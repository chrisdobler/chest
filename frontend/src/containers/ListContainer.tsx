/* tslint:disable */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import Quickview from './QuickviewContainer';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as inventoryActions from '../actions/inventory';

import * as Types from '../types/item';
import { addItemToInventory } from '../actions/inventory';

const styles = (theme: Theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

function mapStateToProps(state, props) {
    return {
        inventory: state.inventory,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(inventoryActions, dispatch),
    };
}
function InventoryList(props: {
    classes: object;
    inventory: Array<Types.Item>;
}) {
    const { classes } = props;

    useEffect(() => {
        const item = {
            photos: [],
        };
        props.actions.addItemToInventory(item);
        console.log('loading.ewew', props);
    }, []);

    return (
        <div>
            <Quickview />
            <List className={classes.root}>
                {props.inventory.map(({ id, photos }, i) => (
                    <Link to={`/items/${id || i}`}>
                        <ListItem>
                            <Avatar
                                alt={photos?.[0]?.id || i}
                                src={photos?.[0]?.src}
                            />
                            <ListItemText
                                primary="Photos"
                                secondary="Jan 9, 2014"
                            />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );
}

InventoryList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(InventoryList));
