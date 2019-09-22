import React from 'react';
import {
  fade,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';

import brown from '@material-ui/core/colors/brown';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    appBar: {
      // color: brown[500],
      backgroundColor: brown[500]
    },
    title: {
      // display: 'none'
      // [theme.breakpoints.up('sm')]: {
      display: 'block'
      // }
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto'
      },
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200
      },
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    },
    sectionAll: {
      display: 'flex'
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    }
  })
);

// https://stackoverflow.com/questions/44953454/pwa-mobile-camera-access
// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
// https://egghead.io/lessons/react-access-the-camera-in-a-pwa-built-with-react

export default function ImagePicker() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState<null | HTMLElement>(null);

  // trigger capture
  // document.getElementById('inputPhoto').click();

  // event handler for change
  function onInputPhotoChange() {
    console.log('changed');
    if (document.getElementById('inputPhoto').files.length === 0) {
      console.log('no length');
      return;
    }

    var reader = new window.FileReader();
    reader.onloadend = function(event) {
      // event.target.result;
      // image data
      // note you may need to rotate using EXIF data on a canvas
    };

    // Read the file into memory as dataurl
    var blob = document.getElementById('inputPhoto').files[0];
    reader.readAsDataURL(blob);
  }

  return (
    <div className={classes.grow}>
      <input
        onChange={onInputPhotoChange}
        type="file"
        accept="image/*"
        id="inputPhoto"
        class="hidden"
        capture="environment"
      />
    </div>
  );
}
