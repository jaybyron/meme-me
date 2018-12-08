
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    alert("signed in as: " + firebase.auth().currentUser.uid);
    let token = firebase.auth().currentUser.uid;
    queryImages(token);

  } else {
    // User is signed out.
    // ...
    alert("not signed in");
    window.location="index.html";
  }
});


document.addEventListener("DOMContentLoaded", function() {
   
});

function queryImages(token){
  let userId = firebase.auth().currentUser.uid;
   firebase.database().ref('/Posts/').once('value').then(function(snapshot) {
   //let username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...
   var PostObj = snapshot.val();
   var keys = Object.keys(PostObj);
   var div = document.getElementById("#img_id");
   let imgArr =[];
   for(var i=0; i<keys.length; i++){
      var current = PostObj[keys[i]];

      if(firebase.auth().currentUser.uid === current["user"]){
         imgArr.push((current["url"]));

      }
   }

    var container = document.getElementById('imageContainer');
    var docFrag = document.createDocumentFragment();

    imgArr.forEach(function(url, index, originalArray) {
        var img = document.createElement('img');
        img.src = url;
        docFrag.appendChild(img);
    });


    container.appendChild(docFrag);
});
}



function firebase_logout(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      alert("Sign out successful. Redirecting to login page");
      window.location = "index.html";
    }).catch(function(error) {
      // An error happened.
      alert(error);
    });
}