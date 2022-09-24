import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { Button, Box } from '@mui/material';
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
    handleSelectBack: () => void;
    handleSelectEdit: () => void;
}

export default function (props: OwnProps) {
    const classes = useStyles();
    const {
        name,
        id,
        selected,
        handleSelect,
        handleSelectBack,
        handleSelectEdit,
    } = props;

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
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <ListItemText
                    primary={name}
                    // className={classes.text}
                    // secondary={date.toDateString()}
                />
                <Box sx={{ display: selected ? 'flex' : 'none' }}>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ marginRight: 1 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSelectBack();
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleSelectEdit}
                    >
                        Edit
                    </Button>
                </Box>
            </Box>
        </ListItem>
    );
}
