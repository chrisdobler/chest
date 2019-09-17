<input
  type="file"
  accept="image/*"
  id="inputPhoto"
  class="hidden"
  capture="environment"
/>;

// trigger capture
document.getElementById('inputPhoto').click();

// event handler for change
function onInputPhotoChange() {
  if (document.getElementById('inputPhoto').files.length === 0) {
    return;
  }

  var reader = new window.FileReader();
  reader.onloadend = function(event) {
    event.target.result;
    // image data
    // note you may need to rotate using EXIF data on a canvas
  };

  // Read the file into memory as dataurl
  var blob = document.getElementById('inputPhoto').files[0];
  reader.readAsDataURL(blob);
}
// https://stackoverflow.com/questions/44953454/pwa-mobile-camera-access
// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
// https://egghead.io/lessons/react-access-the-camera-in-a-pwa-built-with-react
