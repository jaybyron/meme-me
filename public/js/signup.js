
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.open("https://www.w3schools.com");

  } else {
    // No user is signed in.
  }
});

function signup(){
  var userName =document.getElementById("name_field").value;
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("Error : " + errorMessage);

});

 var database = firebase.database();

}


function test(){
	alert("testing");
}