
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        // if user signed in 
        // getting current user data 
        
        firebase.firestore().collection("users").get()
        .then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
               
                if(doc.data().UserId==user.uid){
                    // printing name, email & avatar
                 
                    user_fullname=doc.data().userFullName;
                    document.getElementById("current-user-fullName").innerHTML=doc.data().userFullName;
                    document.getElementById("current-user-email").innerHTML=doc.data().userEmail;
                    currentUserFullName=doc.data().userFullName;
                    el=currentUserFullName.split(" ")
                    avatar=el[0].charAt(0)+el[1].charAt(0)
                    document.getElementById("genrate-avatar").innerHTML=avatar.toUpperCase();
                } 
            })
        })
        .catch(error=>{console.log(error.message)})
        //getting all messages 
        firebase.firestore().collection('AllMessages').orderBy('timestamp', 'asc').onSnapshot(snapshot=>{
            document.getElementById('loading-screen').style.display="none";
            let changes=snapshot.docChanges(); 
            changes.forEach(change=>{
                // decalaring elements
               
                var ul=document.getElementById("messages");
                var li=document.createElement('li');
                var span=document.createElement('span');
                var b=document.createElement('b');
                var userAvatar=document.createElement('div');
                userAvatar.classList.add('user-avatar');
                var genrateUserAvatar=document.createElement('h2');
                genrateUserAvatar.classList.add('user-avatar-txt');
                //getting time 
                var time=change.doc.data().timestamp.toDate();
                var hours=time.getHours();
                var mins=time.getMinutes();
                //formattedTime
                var formattedTime=` ${hours} : ${mins}`;
                
               
               
                (user.uid==change.doc.data().UserID) ?
                //printing own msgs 
                (li.classList.add('mine-messages'),
                liTime=document.createTextNode(formattedTime),
                litxt=document.createTextNode(change.doc.data().userMsg),
                b.classList.add('print-time'),
                li.appendChild(litxt),
                b.appendChild(liTime),
                li.appendChild(b),
                ul.appendChild(li)) : 
               
                (li.classList.add('users-messages'),
                 // getting users msgs
                litxt=document.createTextNode(change.doc.data().userMsg),
                // printing user name 
                usernamevalue=document.createTextNode(change.doc.data().User_name),
                // priniting time
                liTime=document.createTextNode(formattedTime),
                // printing user Avatar 
                 user_name=change.doc.data().User_name,
                 user_name=user_name.split( " "),
                 user_avatar=user_name[0].charAt(0)+user_name[1].charAt(0),
                 genrateUserAvatartxt=document.createTextNode(user_avatar.toUpperCase()),
                 genrateUserAvatar.appendChild(genrateUserAvatartxt),
                 userAvatar.appendChild(genrateUserAvatar),
                 ul.appendChild(userAvatar),
                 
                 setTimeout(function() {
                    var elem = document.getElementById('chat-box');
                    elem.scrollTop = elem.scrollHeight;
                },500),

                
                span.classList.add('user-name'),
                b.classList.add('print-time'),
                span.appendChild(usernamevalue),
                li.appendChild(span),
                li.appendChild(litxt),
                b.appendChild(liTime),
                li.appendChild(b),
                ul.appendChild(li)
                
               
                )})
        })
        sendMessage=(event)=>{
            // getting user msg
            event.preventDefault()
            setTimeout(function() {
                var elem = document.getElementById('chat-box');
                elem.scrollTop = elem.scrollHeight;
            },500);
            var userMsg=document.getElementById("user-input").value;
            if(!userMsg) {Qual.errord("You did not enter anything!")} 
            else{
                document.getElementById("message-input").reset();
                firebase.firestore().collection('AllMessages').add({
                    timestamp:new Date(),
                    userMsg,
                    User_name:user_fullname,
                    UserID:user.uid
                    // timestamp:firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(userMsg=>{console.log("Message added!")})
                .catch(error=>{console.log(error.message)})
            }
        }
    } else {window.location="signin.html"}
})

var logout=(event)=>{
 event.preventDefault()
 firebase.auth().signOut()
 .then(el=>{
 
     window.location="signin.html";
 })
 .catch(erorr=>{
     console.log(error.message)
 })
 
}
