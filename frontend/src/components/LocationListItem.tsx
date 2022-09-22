import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

interface OwnProps {
    id: number;
    name: string;
    selected: boolean;
    handleSelect: (id: number) => void;
}

export default function (props: OwnProps) {
    const classes = useStyles();
    const { name, id, selected, handleSelect } = props;

    return (
        <ListItem selected={selected} onClick={() => handleSelect(id)}>
            <div className={classes.container}>
                {/* <div className={classes.textPanel}>{name}</div> */}
                <div>
                    <img
                        src={name === 'Home' ? homeImage : storageImage}
                        alt="location"
                    />
                </div>
            </div>
            <ListItemText
                primary={name}
                // className={classes.text}
                // secondary={date.toDateString()}
            />
        </ListItem>
    );
}
