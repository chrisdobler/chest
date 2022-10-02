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

    const { actions, editedItem, selectedLocation } = props;
    const { photos: images } = editedItem || {};

    useEffect(() => {
        actions.getItem(
            (itemId && editedItem?.id !== +itemId && +itemId) || null
        );
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
        dispatch(actions.updateHeightOfEditor(0));
        navigate('/items');
    };

    const handleDelete = () => {
        if (editedItem && editedItem.id) actions.deleteItem(editedItem.id);
        dispatch(actions.updateHeightOfEditor(0));
        navigate('/items');
    };

    const handleAddTag = (chip: any) => {
        console.log(chip);
    };
    const handleRemoveTag = (chip: any, index: number) => {
        console.log(chip, index);
    };

    return (
        <Root className={classes.root} ref={sizeRef}>
            <form className={classes.container} noValidate autoComplete="off">
                <div className={classes.imageShelf}>
                    <ImagePicker
                        onUpload={actions.addPhotoToItem}
                        showHelper={!images || images.length < 1}
                    />
                    <ImageGrid images={images || []} />
                </div>

                <TextField
                    id="location"
                    label="Location"
                    value={
                        editedItem?.location?.name ||
                        selectedLocation?.name ||
                        ''
                    }
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    disabled
                />
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
                        {/* <ChipInput
                            value={editedItem?.tags?.map((tag) => tag.name)}
                            onAdd={handleAddTag}
                            onDelete={handleRemoveTag}
                        /> */}
                        <AutoCompleteTags />
                        <TextField
                            id="name"
                            label="Item Title"
                            placeholder="Item Title"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={editedItem?.name || ''}
                            onChange={(e) => handleChange(e, 'name')}
                        />
                        {/* <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="Hello World"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            error
                            id="outlined-error"
                            label="Error"
                            defaultValue="Hello World"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Disabled"
                            defaultValue="Hello World"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            className={classes.textField}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Read Only"
                            defaultValue="Hello World"
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-dense"
                            label="Dense"
                            className={clsx(classes.textField, classes.dense)}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-dense-multiline"
                            label="Dense multiline"
                            className={clsx(classes.textField, classes.dense)}
                            margin="dense"
                            variant="outlined"
                            multiline
                            rowsMax="4"
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Multiline"
                            multiline
                            rowsMax="4"
                            // value={values.multiline || ''}
                            onChange={(e) => handleChange(e, 'multiline')}
                            className={classes.textField}
                            margin="normal"
                            helperText="hello"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            rows="4"
                            defaultValue="Default Value"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-helperText"
                            label="Helper text"
                            defaultValue="Default Value"
                            className={classes.textField}
                            helperText="Some important text"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-with-placeholder"
                            label="With placeholder"
                            placeholder="Placeholder"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Multiline Placeholder"
                            placeholder="Placeholder"
                            multiline
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-number"
                            label="Number"
                            // value={values.age || ''}
                            onChange={(e) => handleChange(e, 'age')}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-search"
                            label="Search field"
                            type="search"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            className={classes.textField}
                            value={values.currency || ''}
                            onChange={(e) => handleChange(e, 'currency')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Please select your currency"
                            margin="normal"
                            variant="outlined"
                        >
                            {currencies.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Native select"
                            className={classes.textField}
                            // value={values.currency}
                            onChange={(e) => handleChange(e, 'currency')}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Please select your currency"
                            margin="normal"
                            variant="outlined"
                        >
                            {currencies.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-full-width"
                            label="Label"
                            style={{ margin: 8 }}
                            placeholder="Placeholder"
                            helperText="Full width!"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="outlined-bare"
                            className={classes.textField}
                            defaultValue="Bare"
                            margin="normal"
                            variant="outlined"
                            inputProps={{ 'aria-label': 'bare' }}
                        /> */}
                        {editedItem && editedItem.id && (
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

export default connector(ItemEditContainer);
