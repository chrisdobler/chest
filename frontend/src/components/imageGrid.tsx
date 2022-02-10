import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            height: 60,
            margin: '0px !important',
        },
        tile: {
            width: '60px',
            height: '60px',
            boxSizing: 'content-box',
            margin: '0px',
        },
        root: {
            // width: '66.6667%',
            height: '60px !important',
            padding: '0px !important',
            overflow: 'visible',
        },
    })
);

export default function ImageGridList({
    images,
}: {
    images: [
        {
            img?: string;
            cols?: number;
            src: string;
            title?: string;
        }
    ];
}) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {images.map((tile) => (
                    <GridListTile
                        classes={{ tile: classes.tile, root: classes.root }}
                        key={tile.img}
                        cols={tile.cols || 1}
                    >
                        <img src={tile.src} alt={tile.title} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}
