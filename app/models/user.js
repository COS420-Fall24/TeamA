const admin = require('../firebaseConfig');


async function createUser(email, password) {
    const userRecord = admin.auth().createUser({
        email: email,
        password: password
    });
    return userRecord
}

async function checkLoginDetails(email, password) {
    try{
        const userCredential = await firebase.auth().signInWithEmailAndPasswrod(email,password)
        const  user = userCredential.user
        return{success:true, uid:user.uid, email: user.email}

    }
    catch(error){
        return{success:false, message: error.message};
    }

}

module.exports = {
    createUser, checkLoginDetails
}