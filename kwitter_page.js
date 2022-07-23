var firebaseConfig = {

      apiKey: "AIzaSyC6JIbAYe96s-SkEpw8eKDKKheaD7wHB7w",
    
      authDomain: "kwitter-1f66c.firebaseapp.com",
    
      projectId: "kwitter-1f66c",
    
      storageBucket: "kwitter-1f66c.appspot.com",
    
      messagingSenderId: "515600537355",
    
      appId: "1:515600537355:web:69867119441c4e1ceb340e"
    
    };
    
    
    // Initialize Firebase
    
    firebase.initializeApp(firebaseConfig);//YOUR FIREBASE LINKS


user_name=localStorage.getItem("username");
roomname=localStorage.getItem("roomname");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code

//End code
      } });  }); }
getData();



function send(){
      id_input=document.getElementById("msg").value;
      firebase.database().ref(roomname).push({
            name:user_name,
            message:id_input,
            like:0
      });
      document.getElementById("msg").value="";

}



function getData(){
      firebase.database().ref("/"+room_name).on('value',function(snapshot){
            document.getElementById("output").innerHTML="";
            snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose"){
                  firebase_message_id=childKey;
                  message_data=childData;
                  console.log(firebase_message_id);
                  console.log(message_data);
                  name=message_data['name'];
                  massage=message_data['message'];
                  like=message_data['like'];
                  name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
                  message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
                  like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
                  spanwidth_tag="<span class='glyphicon glyphicon-thumbs-up'>like: "+like+"</span> </button> <hr>";
                  row=name_with_tag+message_with_tag+like_button+spanwidth_tag;
                  document.getElementById("output").innerHTML+=row;


            }

      });
});
}




getData();

function updateLike(messageId){
      button_id=messageId;
      likes=document.getElementById(button_id).value;
      updatedlikes=Number(likes)+1;
      firebase.database().ref(room_name).child(messageId).update({
            like:updatedlikes
      });

}



function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location.replace="kwitter.html";}