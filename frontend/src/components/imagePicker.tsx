import React from 'react';
import {
  fade,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';

import brown from '@material-ui/core/colors/brown';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      position: 'relative',
      overflow: 'hidden'
    },
    visible: {
      display: 'flex'
    },
    button: {
      maxWidth: '60px',
      height: '60px',
      width: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    hidden: {
      // position: 'relative',
      zIndex: 2,
      opacity: 0,
      position: 'absolute',
      left: 0,
      height: '100%'
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
  function onInputPhotoChange(data) {
    console.log(document.getElementById('inputPhoto').files);
    if (document.getElementById('inputPhoto').files.length === 0) {
      console.log('no length');
      return;
    }

    var reader = new window.FileReader();
    reader.onloadend = function(event) {
      console.log('filereader', event);
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
        className={classes.hidden}
        capture="environment"
      />
      <div className={classes.visible}>
        <div className={classes.button}>
          <AddIcon />
        </div>
        <div>Add Photos</div>
      </div>
    </div>
  );
}
