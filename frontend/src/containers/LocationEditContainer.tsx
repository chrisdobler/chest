import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@material-ui/core/MenuItem';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { Button, TextField } from '@mui/material';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import actions from '../actions';

import ImagePicker from '../components/ImagePicker';
import ImageGrid from '../components/ImageGrid';

import { IState } from '../store';

const PREFIX = 'ItemEditContainer';

const classes = {
    root: `${PREFIX}-root`,
    container: `${PREFIX}-container`,
    additionalDetailsContainer: `${PREFIX}-additionalDetailsContainer`,
    textField: `${PREFIX}-textField`,
    doneButton: `${PREFIX}-doneButton`,
    dense: `${PREFIX}-dense`,
    menu: `${PREFIX}-menu`,
    imageShelf: `${PREFIX}-imageShelf`,
    heading: `${PREFIX}-heading`,
    expansionPanel: `${PREFIX}-expansionPanel`,
};

const Root = styled('div')(({ theme: Theme }) => ({
    [`&.${classes.root}`]: {
        position: 'fixed',
        backgroundColor: 'white',
        zIndex: 1,
        width: '100%',
    },

    [`& .${classes.container}`]: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        paddingTop: 66,
    },

    [`& .${classes.additionalDetailsContainer}`]: {
        flexDirection: 'column',
    },

    [`& .${classes.textField}`]: {
        marginLeft: Theme.spacing(1),
        marginRight: Theme.spacing(1),
    },

    [`& .${classes.doneButton}`]: {
        marginLeft: Theme.spacing(1),
        marginRight: Theme.spacing(1),
        zIndex: 1,
    },

    [`& .${classes.dense}`]: {
        marginTop: Theme.spacing(2),
    },

    [`& .${classes.menu}`]: {
        width: 200,
    },

    [`& .${classes.imageShelf}`]: {
        display: 'flex',
    },

    [`& .${classes.heading}`]: {},

    [`& .${classes.expansionPanel}`]: {
        '&:before': {
            backgroundColor: 'white',
        },
    },
}));

interface OwnProps {}

const ItemEditContainer: React.FC<OwnProps> = () => {
    const navigate = useNavigate();
    const sizeRef = useRef<HTMLDivElement>(null);
    const { locationId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const { selectedLocation } = useSelector((state: IState) => state.location);

    // const { photos: images } = selectedLocation || {};

    useEffect(() => {
        if (
            locationId &&
            (selectedLocation?.id && selectedLocation.id) !== +locationId
        ) {
            dispatch(actions.setLocationById(+locationId));
        }
    }, [location]);
    useEffect(() => {
        return function cleanup() {
            dispatch(actions.updateHeightOfEditor(0));
            dispatch(actions.clearEditorFields());
        };
    }, []);

    useLayoutEffect(() => {
        if (sizeRef.current) {
            const height = sizeRef.current.clientHeight;
            dispatch(actions.updateHeightOfEditor(height));
        }
    }, [sizeRef.current, sizeRef.current ? sizeRef.current.clientHeight : 0]);

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
        name: string
    ) => {
        dispatch(
            actions.setLocationProperty({
                key: name,
                value: event.target.value,
            })
        );
    };

    const handleSave = () => {
        if (selectedLocation)
            dispatch(actions.submitLocationToInventory(selectedLocation));
        dispatch(actions.updateHeightOfEditor(0));
        navigate('/items');
    };

    const handleDelete = () => {
        if (selectedLocation && selectedLocation.id)
            dispatch(actions.deleteLocation(selectedLocation.id));
        dispatch(actions.updateHeightOfEditor(0));
        navigate('/locations');
    };

    return (
        <Root className={classes.root} ref={sizeRef}>
            <form className={classes.container} noValidate autoComplete="off">
                <div className={classes.imageShelf}>
                    <ImagePicker
                        onUpload={actions.addPhotoToItem}
                        // showHelper={!images || images.length < 1}
                        showHelper
                    />
                    {/* <ImageGrid images={images || []} /> */}
                </div>

                <TextField
                    id="location"
                    label="Location Name"
                    value={selectedLocation?.name || ''}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => handleChange(e, 'name')}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.doneButton}
                    // onClick={handleSave}
                    sx={{ marginBottom: 1 }}
                >
                    Print Location Tag
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.doneButton}
                    onClick={handleSave}
                >
                    Done
                </Button>
                <ExpansionPanel
                    className={classes.expansionPanel}
                    onChange={() =>
                        setTimeout(
                            () =>
                                dispatch(
                                    actions.updateHeightOfEditor(
                                        sizeRef.current
                                            ? sizeRef.current.clientHeight
                                            : 0
                                    )
                                ),
                            250
                        )
                    }
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            Additional Details
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                        className={classes.additionalDetailsContainer}
                    >
                        {/* <TextField
                            id="name"
                            label="Item Title"
                            placeholder="Item Title"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={editedItem?.name || ''}
                            onChange={(e) => handleChange(e, 'name')}
                        /> */}
                        {selectedLocation && selectedLocation.id && (
                            <Button
                                variant="contained"
                                color="error"
                                className={classes.doneButton}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        )}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </form>
        </Root>
    );
};

export default ItemEditContainer;
