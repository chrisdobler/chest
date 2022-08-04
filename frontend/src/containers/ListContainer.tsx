/* tslint:disable */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import inventoryActions from '../actions/inventory';

import Quickview from './QuickviewContainer';
import { IState } from '../store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        text: {
            paddingLeft: 10,
        },
    })
);

function mapStateToProps(state: IState) {
    return {
        inventory: state.inventory,
        editedItem: state.editedItem,
    };
}
function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators(inventoryActions, dispatch),
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface OwnProps {}

export type Props = OwnProps & PropsFromRedux;

function InventoryList(props: Props) {
    const { inventory, actions, editedItem } = props;
    const classes = useStyles();

    useEffect(() => {
        if (!inventory) actions.getItems();
    });

    return (
        <div>
            <Quickview />
            <List className={classes.root}>
                {inventory?.map(({ id, photos, name, updatedAt }, i) => {
                    const date = new Date((updatedAt || '') as string);
                    const { REACT_APP_CHEST_API_URL } = process.env;
                    return (
                        <Link to={`/items/${id || i}`} key={id || i}>
                            <ListItem
                                selected={
                                    !!(editedItem && editedItem.id === id)
                                }
                            >
                                <Avatar
                                    src={`${REACT_APP_CHEST_API_URL}/public/${photos?.[0]?.src}`}
                                />
                                <ListItemText
                                    primary={name}
                                    className={classes.text}
                                    secondary={date.toDateString()}
                                />
                            </ListItem>
                        </Link>
                    );
                })}
            </List>
        </div>
    );
}

export default connector(InventoryList);
