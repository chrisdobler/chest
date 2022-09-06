import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import inventoryActions from '../actions/inventory';
import { IState } from '../store';

import homeImage from './house.png';
import storageImage from './storage.png';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            // flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginRight: 30,
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

// type PropsFromRedux = ConnectedProps<typeof connector>;

interface OwnProps {
    id: string;
    name: string;
}

// export type Props = OwnProps & PropsFromRedux;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((props: OwnProps) => {
    const classes = useStyles();
    const { name, id } = props;

    // const handleChange =
    //     (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //         setItemProperty({ ...values, [name]: event.target.value });
    //     };

    return (
        <div className={classes.container}>
            <div className={classes.textPanel}>{name}</div>
            <div>
                <img
                    src={name === 'Home' ? homeImage : storageImage}
                    alt="location"
                />
            </div>
        </div>
    );
});
