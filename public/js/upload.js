

function uploadFile(){
	//get the File
    let theFile = getFile();
    //get filename from user input
    let fileUploadName = getFileName();

	//create a root reference
	let storageRef = firebase.storage().ref('/images/');

	//create a reference to the file in the cloud
	let cloudImgRef = storageRef.child('/images/' + fileUploadName);

	//upload the file to firebase using put
	let uploadTask = storageRef.put(theFile);

	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	uploadTask.on('state_changed', function(snapshot){
	  // Observe state change events such as progress, pause, and resume
	  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
	  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	  console.log('Upload is ' + progress + '% done');
	  switch (snapshot.state) {
	    case firebase.storage.TaskState.PAUSED: // or 'paused'
	      console.log('Upload is paused');
	      break;
	    case firebase.storage.TaskState.RUNNING: // or 'running'
	      console.log('Upload is running');
	      break;
	  }
	}, function(error) {
	  alert(error);
	}, function() {
	  // Handle successful uploads on complete
	  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
	  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
	    console.log('File available at', downloadURL);
	  });
	});

}

function getFile(){
   if(document.getElementById('file_upload').files.length >0){
   	  return document.getElementById('file_upload').files[0];
   }
   else{
   	return null;
   }
}

function getFileName(){
    let fileInput = document.getElementById("file_upload");
    let fileName = null;

	if(fileInput.files.length>0){
       fileName = fileInput.files[0].name;
	}

	return fileName;

}

function getFileData(){
    var x = document.getElementById("file_upload");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    } 
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
    document.getElementById("demo").innerHTML = txt;
}