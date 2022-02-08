import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            position: 'relative',
            overflow: 'hidden',
        },
        visible: {
            display: 'flex',
        },
        button: {
            maxWidth: '60px',
            height: '60px',
            width: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        hidden: {
            // position: 'relative',
            zIndex: 2,
            opacity: 0,
            position: 'absolute',
            left: 0,
            height: '100%',
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionAll: {
            display: 'flex',
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        addPhotosPlaceholder: {
            width: '155px',
            display: 'flex',
            alignItems: 'center',
        },
    })
);

// https://stackoverflow.com/questions/44953454/pwa-mobile-camera-access
// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
// https://egghead.io/lessons/react-access-the-camera-in-a-pwa-built-with-react

export default function ImagePicker({
    showHelper = true,
    onUpload,
}: {
    showHelper: boolean;
    onUpload: () => {};
}) {
    const classes = useStyles();

    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    //     React.useState<null | HTMLElement>(null);

    // event handler for change
    function onInputPhotoChange() {
        const reader = new window.FileReader();
        reader.onload = function () {
            onUpload({ src: reader.result });
        };

        // Read the file into memory as dataurl
        const blob = document.getElementById('inputPhoto').files[0];
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
                {showHelper && (
                    <div className={classes.addPhotosPlaceholder}>
                        Add Photos
                    </div>
                )}
            </div>
        </div>
    );
}
