import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@material-ui/core/MenuItem';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { Button, TextField } from '@mui/material';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AutoCompleteTags from '../components/AutocompleteTags';

import allActions from '../actions';

import ImagePicker from '../components/ImagePicker';
import ImageGrid from '../components/ImageGrid';

import { IState } from '../store';
import { Tag } from '../types';

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

const mapStateToProps = (state: IState) => ({
    editedItem: state.editedItem,
    selectedLocation: state.location.selectedLocation,
    interfaceVars: state.interfaceVars,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators(allActions, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface OwnProps {}

export type Props = OwnProps & PropsFromRedux;

const ItemEditContainer: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    const sizeRef = useRef<HTMLDivElement>(null);
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    const { actions, editedItem, selectedLocation, interfaceVars } = props;
    const { photos: images } = editedItem || {};

    useEffect(() => {
        actions.getItem(
            (itemId && editedItem?.id !== +itemId && +itemId) || null
        );
    }, [location]);
    useEffect(() => {
        return function cleanup() {
            actions.updateHeightOfEditor(0);
            actions.clearEditorFields();
        };
    }, []);

    useLayoutEffect(() => {
        if (sizeRef.current) {
            const height = sizeRef.current.clientHeight;
            actions.updateHeightOfEditor(height);
        }
    }, [sizeRef.current, sizeRef.current ? sizeRef.current.clientHeight : 0]);

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
        name: string
    ) => {
        actions.setItemProperty({
            key: name,
            value: event.target.value,
        });
    };

    const handleSave = () => {
        if (editedItem)
            actions.submitItemToInventory(
                editedItem,
                editedItem?.location || selectedLocation || null
            );
        actions.updateHeightOfEditor(0);
        navigate('/items');
    };

    const handleDelete = () => {
        if (editedItem && editedItem.id) actions.deleteItem(editedItem.id);
        actions.updateHeightOfEditor(0);
        navigate('/items');
    };

    const handleTagChange = (Tags: Tag[]) => {
        dispatch(allActions.setItemProperty({ key: 'tags', value: Tags }));
    };

    const handleAddNewTag = (tagString: string) => {
        dispatch(allActions.addNewTagToItem(tagString));
    };

    return (
        <Root className={classes.root} ref={sizeRef}>
            <form className={classes.container} noValidate autoComplete='off'>
                <div className={classes.imageShelf}>
                    <ImagePicker
                        onUpload={actions.addPhotoToItem}
                        showHelper={!images || images.length < 1}
                    />
                    <ImageGrid images={images || []} />
                </div>

                <TextField
                    id='location'
                    label='Location'
                    value={
                        editedItem?.location?.name ||
                        selectedLocation?.name ||
                        ''
                    }
                    className={classes.textField}
                    margin='normal'
                    variant='outlined'
                    disabled
                />
                <Button
                    variant='contained'
                    color='primary'
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
                                actions.updateHeightOfEditor(
                                    sizeRef.current
                                        ? sizeRef.current.clientHeight
                                        : 0
                                ),
                            250
                        )
                    }
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                    >
                        <Typography className={classes.heading}>
                            Additional Details
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                        className={classes.additionalDetailsContainer}
                    >
                        <AutoCompleteTags
                            currentTagOptions={interfaceVars.editorTagOptions}
                            handleTextSearchInput={
                                actions.getTagOptionsForString
                            }
                            handleTagChange={handleTagChange}
                            handleAddNewTag={handleAddNewTag}
                            selectedTags={editedItem?.tags || []}
                        />
                        <TextField
                            id='name'
                            label='Item Title'
                            placeholder='Item Title'
                            className={classes.textField}
                            margin='normal'
                            variant='outlined'
                            value={editedItem?.name || ''}
                            onChange={(e) => handleChange(e, 'name')}
                        />
                        {editedItem && editedItem.id && (
                            <Button
                                variant='contained'
                                color='error'
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

export default connector(ItemEditContainer);
