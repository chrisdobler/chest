/* tslint:disable */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    })
);

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
    inventory: Array<Types.Item>;
    actions: typeof inventoryActions;
}) {
    const { actions, inventory } = props;
    const classes = useStyles();

    return (
        <div>
            <Quickview />
            <List className={classes.root}>
                {inventory.map(({ id, photos }, i) => (
                    <Link to={`/items/${id || i}`} key={id || i}>
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

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList);
