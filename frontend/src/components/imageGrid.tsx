import React from 'react';
import { Buffer } from 'buffer';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Photo } from '../types/item';

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

export default function ImageGridList({ images }: { images: Array<Photo> }) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {images.map((tile, i) => {
                    const { REACT_APP_CHEST_API_URL } = process.env;
                    const src: string =
                        typeof tile.src === 'string' &&
                        !tile.src.startsWith('data')
                            ? `${REACT_APP_CHEST_API_URL}/public/${tile.src}`
                            : Buffer.from(tile.src as ArrayBuffer).toString();
                    return (
                        <GridListTile
                            classes={{ tile: classes.tile, root: classes.root }}
                            key={tile.id || i}
                            cols={tile.width || 1}
                        >
                            <img
                                src={src}
                                alt={tile.title || tile.id || `${i}`}
                            />
                        </GridListTile>
                    );
                })}
            </GridList>
        </div>
    );
}
