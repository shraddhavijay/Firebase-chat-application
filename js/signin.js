var loadingscreen=()=>{
    document.getElementById('loading-screen').style.display="none";
}
// Signing user
var login=(event)=>{
        event.preventDefault()
        let userEmail=document.getElementById("userEmail").value;
        let password=document.getElementById("UserPassword").value;
        document.getElementById("mine-loader").style.display="block";
        (!userEmail || !password) ?   (Qual.errord("Fill all required Fields!")) (document.getElementById("mine-loader").style.display="none") : signingUser(userEmail,password)}


var signingUser=(userEmail,password)=>{
    firebase.auth().signInWithEmailAndPassword(userEmail,password)
    .then(doc=>{
      
        document.getElementById("mine-loader").style.display="none";
        window.location="chat-home.html"
        })
        .catch(error=>{
            console.log(error.message)
            Qual.errord(error.message);
            document.getElementById("mine-loader").style.display="none";
        })
}
