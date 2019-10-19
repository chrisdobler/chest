import React from 'react';
import {
  Theme,
  createStyles,
  makeStyles,
  withStyles
} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: 350,
      height: 60
    },
    tile: {
      width: '60px',
      height: '60px',
      boxSizing: 'content-box',
      margin: '0px'
    },
    root: {
      width: '66.6667%',
      height: 64,
      padding: '2px'
    }
  })
);

export default function ImageGridList(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {props.images.map(tile => (
          <GridListTile
            classes={{ tile: classes.tile, root: classes.root }}
            key={tile.img}
            cols={tile.cols || 1}
          >
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
