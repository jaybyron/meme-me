

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    alert("signed in");
    var user_token = firebase.auth().currentUser.uid;

  } else {
    // User is signed out.
    // ...
    alert("not signed in");
    window.location="index.html";
  }
});



// helper function that gets the file itself
function getFile(){
   if(document.getElementById('file_upload').files.length >0){
   	  return document.getElementById('file_upload').files[0];
   }
   else{
   	return null;
   }
}


//helper function that gets the file name
function getFileName(){
    let fileInput = document.getElementById("file_upload");
    let fileName = null;

	if(fileInput.files.length>0){
       fileName = fileInput.files[0].name;
	}

	return fileName;

}

//helper function to check the mimetypes before uploading. currently only allows
//jpeg, png and gif and rejects all other mimetypes.
function checkMime(file){
  let fileInput = document.getElementById("file_upload");
  if(fileInput.files[0].type === "image/jpeg"){
  	return true;
  }

  else if(fileInput.files[0].type === "image/png"){
  	return true;
  }

  else if(fileInput.files[0].type === "image/gif"){
  	return true;
  }


  else{
    return false;
  }

}


//main upload function that uploads files to our firebase cloud storage
//this function also updates our post database that is populated with images
//and the image metadata
function uploadFile(){
    alert("uploading file: progress bar in console");

    //get user id
	let user_token = firebase.auth().currentUser.uid;
	//get the File
    let theFile = getFile();

    //check the filetypes before continuing the upload.
	 if(!(checkMime(theFile))){
        alert("Invalid filetype. Must be jpeg, png or gif");
        return;
	 }


    //get filename from user input
    let fileUploadName = getFileName();

	//create a root reference
	let storageRef = firebase.storage().ref('/images/');

	//create a reference to the file in the cloud
	let cloudImgRef = storageRef.child('/images/' + fileUploadName);

	//upload the file to firebase using put
	let uploadTask = cloudImgRef.put(theFile);

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
	    //console.log('File available at', downloadURL);

	      //create refence key in the database
		  let postKey = firebase.database().ref('Posts/').push().key;
		  let download_URL = downloadURL;
	      
		  let updates = {};
		  let postData ={
		  	filename:fileUploadName,
		  	url: download_URL,
		  	user: user_token
		  };

		  updates['/Posts/'+postKey] = postData;
		  firebase.database().ref().update(updates);
		  alert("upload successful!: Your User homepage has been updated!");
	  });


	});


}
