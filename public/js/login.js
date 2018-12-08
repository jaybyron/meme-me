

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    alert("successfully logged in!");
    var user_token = firebase.auth().currentUser.uid;
    window.location="home.html";

  } else {
    // User is signed out.
    // ...
  }
});



function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}
