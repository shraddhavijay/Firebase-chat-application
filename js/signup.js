
var loadingscreen=()=>{
    document.getElementById('loading-screen').style.display="none";
}
var registerUser=(event)=>{
    event.preventDefault()
    var userFullName=document.getElementById("userFullName").value;
    var userEmail=document.getElementById("userEmail").value;
    var userpassword=document.getElementById("UserPassword").value;
    var genderValue=document.getElementsByName("gender");
    for(var i=0; i<genderValue.length; i++){(genderValue[i].checked) ? (gendercheckedValue=genderValue[i].value) : console.log("error");}
    (!userFullName || !userEmail || !userpassword ) ? Qual.errord("Fill All Required Fileds !") : authenticatingAndStoringData(userFullName,userEmail,userpassword, gendercheckedValue);}

var authenticatingAndStoringData=(userFullName,userEmail,userpassword,gendercheckedValue)=>{
    var userFullName=document.getElementById("userFullName").value;
    var userEmail=document.getElementById("userEmail").value;
    var userpassword=document.getElementById("UserPassword").value;
    var genderValue=document.getElementsByName("gender");

(document.getElementById("mine-loader").style.display="block"),
(firebase.auth().createUserWithEmailAndPassword(userEmail,userpassword)
.then(doc=>{
    Qual.successd('Account successfully created. Thank you for your registration! ');
    document.getElementById("mine-loader").style.display="none";
    document.getElementById("signup-form").reset()
    firebase.firestore().collection('users').doc(doc.user.uid).set({
        userFullName,
        userEmail,
        gendercheckedValue,
        UserId:doc.user.uid
    })
    .then(userdata=>{console.log("Success")})
    .catch(error=>{
        console.log(error.message)
        Qual.errord(error.message);
        document.getElementById("mine-loader").style.display="none";
    })
})
.catch(error=>{
    console.log(error.message)
    Qual.errord(error.message);
    document.getElementById("mine-loader").style.display="none";
}))
}
