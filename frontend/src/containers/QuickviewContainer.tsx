import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import inventoryActions from '../actions/inventory';
import { IState } from '../store';

import homeImage from './house.png';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            // flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        additionalDetailsContainer: {
            flexDirection: 'column',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        margin: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        dense: {
            marginTop: theme.spacing(2),
        },
        menu: {
            width: 200,
        },
        textPanel: {
            fontSize: '20px',
            marginRight: '51px',
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(() => {
    const classes = useStyles();

    // const handleChange =
    //     (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //         setValues({ ...values, [name]: event.target.value });
    //     };

    return (
        <div className={classes.container}>
            <div className={classes.textPanel}>Home</div>
            <div>
                <img src={homeImage} alt="location" />
            </div>
        </div>
    );
});
