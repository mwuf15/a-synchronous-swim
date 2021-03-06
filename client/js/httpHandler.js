(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  const ajaxFileReceived = () => {
    // const direction = ['left', 'right', 'up', 'down'];
    // const directionData = (direction) => {
    //   const random = Math.floor(Math.random() * direction.length);
    //   return direction[random];
    // }
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (data) => {
        console.log('this is data from success:', data)
        // console.log('this is img from success:', img)
        SwimTeam.move(data);

      },
      error: (data) => {
        console.log('failed to get data : ', data)
      }
    });
  }
  //
  setInterval(ajaxFileReceived, 5000);
  // ajaxFileReceived();
  const fetchImage = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl + '/background.jpg',
      success: (data) => {
        console.log('this is img from success:', data)
        // console.log('this is img from success:', img)
        // SwimTeam.move(data);
      },
      error: (data) => {
        console.log('failed to get data : ', data)
      }
    });
  }
  fetchImage();
  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl + '/background.jpg',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
