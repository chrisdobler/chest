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

import homeImage from './house.png';

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
      // flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
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
    },
    textPanel: {
      fontSize: '20px',
      marginRight: '51px'
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
    <div className={classes.container}>
      <div className={classes.textPanel}>Home</div>
      <div>
        <img src={homeImage} />
      </div>
    </div>
  );
});
