/* tslint:disable */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { withStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import inventoryActions from '../actions/inventory';

import Quickview from './QuickviewContainer';
import { IState } from '../store';

import * as Types from '../types/item';

const styles = (theme: Theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

function mapStateToProps(state: IState) {
    return {
        inventory: state.inventory,
    };
}
function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators(inventoryActions, dispatch),
    };
}
function InventoryList(props: {
    classes: object;
    inventory: Array<Types.Item>;
    actions: typeof inventoryActions;
}) {
    const { classes, actions, inventory } = props;

    useEffect(() => {
        const item = {
            photos: [],
        };
        actions.addItemToInventory(item);
        console.log('loading.ewew', props);
    }, []);

    return (
        <div>
            <Quickview />
            <List className={classes.root}>
                {inventory.map(({ id, photos }, i) => (
                    <Link to={`/items/${id || i}`}>
                        <ListItem>
                            <Avatar src={photos?.[0]?.src} />
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(InventoryList));
