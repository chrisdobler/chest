import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ListContainer from './ListContainer';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as inventoryActions from '../actions/inventory';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const currencies = [
  {
    value: 'USD',
    label: '$'
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column'
    },
    additionalDetailsContainer: {
      flexDirection: 'column'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    margin: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    dense: {
      marginTop: theme.spacing(2)
    },
    menu: {
      width: 200
    }
  })
);

interface State {
  name: string;
  age: string;
  multiline: string;
  currency: string;
}

function mapStateToProps(state, props) {
  return {
    inventory: state.inventory
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(inventoryActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function OutlinedTextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR'
  });

  const handleChange = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-uncontrolled"
          label="Uncontrolled"
          defaultValue="foo"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary" className={classes.margin}>
          Done
        </Button>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Additional Details
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.additionalDetailsContainer}>
            <TextField
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
                readOnly: true
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
              value={values.multiline}
              onChange={handleChange('multiline')}
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
              value={values.age}
              onChange={handleChange('age')}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
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
              value={values.currency}
              onChange={handleChange('currency')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Please select your currency"
              margin="normal"
              variant="outlined"
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Native select"
              className={classes.textField}
              value={values.currency}
              onChange={handleChange('currency')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Please select your currency"
              margin="normal"
              variant="outlined"
            >
              {currencies.map(option => (
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
                shrink: true
              }}
            />
            <TextField
              id="outlined-bare"
              className={classes.textField}
              defaultValue="Bare"
              margin="normal"
              variant="outlined"
              inputProps={{ 'aria-label': 'bare' }}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </form>
      <ListContainer />
    </div>
  );
});
