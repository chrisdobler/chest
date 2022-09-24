import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { Button } from '@mui/material';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import inventoryActions from '../actions/inventory';
import ItemActions from '../actions/item';
import interfaceActions from '../actions/interface';

import ImagePicker from '../components/ImagePicker';
import ImageGrid from '../components/ImageGrid';

import { IState } from '../store';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            backgroundColor: 'white',
            zIndex: 1,
            width: '100%',
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            paddingTop: 66,
        },
        additionalDetailsContainer: {
            flexDirection: 'column',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        doneButton: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            zIndex: 1,
        },
        dense: {
            marginTop: theme.spacing(2),
        },
        menu: {
            width: 200,
        },
        imageShelf: {
            display: 'flex',
        },
        heading: {},
        expansionPanel: {
            '&:before': {
                backgroundColor: 'white',
            },
        },
    })
);

const mapStateToProps = (state: IState) => ({
    editedItem: state.editedItem,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators(inventoryActions, dispatch),
    itemActions: bindActionCreators(ItemActions, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface OwnProps {}

export type Props = OwnProps & PropsFromRedux;

const ItemEditContainer: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const sizeRef = useRef<HTMLDivElement>(null);
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    const { itemActions, actions, editedItem } = props;
    const { photos: images } = editedItem || {};

    useEffect(() => {
        if (itemId && (editedItem?.id && editedItem.id) !== +itemId) {
            itemActions.getItem(+itemId);
            // if (sizeRef.current) {
            //     const height = sizeRef.current.clientHeight;
            //     dispatch(interfaceActions.updateHeightOfEditor(height));
            // }
        }
    }, [location]);
    useEffect(() => {
        return function cleanup() {
            console.log({ editedItem });
            dispatch(interfaceActions.updateHeightOfEditor(0));
            dispatch(itemActions.clearEditorFields());
        };
    }, []);

    useLayoutEffect(() => {
        if (sizeRef.current) {
            const height = sizeRef.current.clientHeight;
            dispatch(interfaceActions.updateHeightOfEditor(height));
        }
    }, [sizeRef.current, sizeRef.current ? sizeRef.current.clientHeight : 0]);

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
        name: string
    ) => {
        itemActions.setItemProperty({
            key: name,
            value: event.target.value,
        });
    };

    const handleSave = () => {
        if (editedItem) actions.submitItemToInventory(editedItem);
        dispatch(interfaceActions.updateHeightOfEditor(0));
        navigate('/items');
    };

    const handleDelete = () => {
        if (editedItem && editedItem.id) itemActions.deleteItem(editedItem.id);
        dispatch(interfaceActions.updateHeightOfEditor(0));
        navigate('/items');
    };

    return (
        <div className={classes.root} ref={sizeRef}>
            <form className={classes.container} noValidate autoComplete="off">
                <div className={classes.imageShelf}>
                    <ImagePicker
                        onUpload={itemActions.addPhotoToItem}
                        showHelper={!images || images.length < 1}
                    />
                    <ImageGrid images={images || []} />
                </div>

                <TextField
                    id="location"
                    label="Location"
                    defaultValue=""
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
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
                                    interfaceActions.updateHeightOfEditor(
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
                                color="secondary"
                                className={classes.doneButton}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        )}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </form>
        </div>
    );
};

export default connector(ItemEditContainer);
