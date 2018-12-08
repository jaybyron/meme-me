
/*firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
    const userRef = firebase.database().ref('users/')

  } else {
    // No user is signed in.
  }
});*/


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

  alert("Now signed in");
  window.location = "home.html";

  } else {
    // User is signed out.
    // ...
  }
});


function signup(){
  var userName =document.getElementById("name_field").value;
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  let userInfo ={
    fullName :userName,
    email: userEmail,
  };

  let a = firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
   // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("Error : " + errorMessage);
  });
  
  let userKey = firebase.database().ref('Users/').push().key;
  let updates = {};
  updates['/Users/' + userKey] = userInfo;
  firebase.database().ref().update(updates);

}




