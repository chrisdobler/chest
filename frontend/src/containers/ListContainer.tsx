/* tslint:disable */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Chip, Box, Avatar } from '@mui/material';

import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import allActions from '../actions';

import { IState } from '../store';
import LocationListItem from '../components/LocationListItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: ({ interfaceVars }: PropsFromRedux) =>
                interfaceVars.listItemContainerPadding,
        },
        listContainer: {
            width: '100%',
            // maxWidth: 360,
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
        interfaceVars: state.interfaceVars,
        locations: state.location.allLocations,
        selectedLocation: state.location.selectedLocation,
    };
}
function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators(allActions, dispatch),
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface OwnProps {}

export type Props = OwnProps & PropsFromRedux;

function InventoryList(props: Props) {
    const navigate = useNavigate();

    const {
        inventory,
        actions,
        editedItem,
        interfaceVars,
        locations,
        selectedLocation,
    } = props;
    const classes = useStyles(props);

    useEffect(() => {
        actions.getLocations();
        // actions.getItems();
    }, []);

    const handleLocationSelect = async (id: number) => {
        const action = await actions.setLocationById(id);
    };

    const handleLocationEdit = () => {
        if (selectedLocation) navigate(`/locations/${selectedLocation.id}`);
    };

    return (
        <div className={classes.root}>
            <List className={classes.listContainer}>
                {(
                    (selectedLocation?.id && [selectedLocation]) ||
                    locations ||
                    []
                ).map(({ name, id }) => (
                    <LocationListItem
                        key={id}
                        name={name || ''}
                        id={id || -1}
                        selected={selectedLocation?.id === id}
                        handleSelect={handleLocationSelect}
                        handleSelectBack={() => actions.setLocationById(-1)}
                        handleSelectEdit={() => handleLocationEdit()}
                    />
                ))}
            </List>
            <List className={classes.listContainer}>
                {selectedLocation &&
                    inventory?.map(
                        ({ id, photos, name, updatedAt, tags }, i) => {
                            const date = new Date((updatedAt || '') as string);
                            const { REACT_APP_CHEST_API_URL } = process.env;

                            const photoData = photos?.[0]?.src;
                            let src: string = '';

                            if (photoData)
                                src = !photoData.startsWith('data')
                                    ? `${REACT_APP_CHEST_API_URL}/public/${photoData}`
                                    : Buffer.from(photoData).toString();

                            return (
                                <Link to={`/items/${id || i}`} key={id || i}>
                                    <ListItem
                                        selected={
                                            !!(
                                                editedItem &&
                                                editedItem.id === id
                                            )
                                        }
                                    >
                                        <Avatar
                                            src={src}
                                            sx={{ marginRight: 1 }}
                                        />
                                        <Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    marginBottom: 1,
                                                }}
                                            >
                                                {name}
                                                {tags?.map((tag) => (
                                                    <Chip
                                                        size="small"
                                                        label={tag.name}
                                                        color="error"
                                                    />
                                                ))}
                                            </Box>
                                            {date.toDateString()}
                                        </Box>
                                    </ListItem>
                                </Link>
                            );
                        }
                    )}
            </List>
        </div>
    );
}

export default connector(InventoryList);
