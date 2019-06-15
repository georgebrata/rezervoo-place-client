import firebase, { database } from 'firebase'
import config from '../config/firebase'

firebase.initializeApp(config);
const db = firebase.database();

export const firebase_auth = firebase.auth();

export const singUp = async (userData) => {
    let data = {}
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(userData.account, userData.password);
        data.message = "success";
        await firebase.auth().currentUser.sendEmailVerification(); 
    } catch (error) {
        switch (error.code) {
            case 'auth/email-already-in-use': {
                data.message = 'Email already in use！'
                break;
            }
            case 'auth/invalid-email': {
                data.message = 'Invalid email！'
                break;
            }
            case 'auth/weak-password': {
                data.message = 'Passwords must match！'
                break;
            }
            default: { data.message = error.message }
        }
    }
    return data;
}

export const singIn = async (userData) => {
    let data = {}
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(userData.account, userData.password);
        if (!res.emailVerified) { 
            data.message = 'Welcome!'
            return data;
        }
        firebase.auth().setPersistence(userData.rememberLogin ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION);
        data = {
            message: "success",
            uid: res.uid,
            account: userData.account,
            displayName: res.displayName
        }
    } catch (error) {
        switch (error.code) {
            case 'auth/invalid-email': {
                data.message = 'Invalid email!'
                break;
            }
            case 'auth/user-disabled': {
                data.message = 'User disabled！'
                break;
            }
            case 'auth/user-not-found': {
                data.message = 'User not found！'
                break;
            }
            case 'auth/wrong-password': {
                data.message = 'Wrong password！'
                break;
            }
            default: { data.message = error.message }
        }
        return data;
    }
    return data;
}

export const resetPassword = async (email) => {
    let data = {}
    try {
        const res = await firebase.auth().sendPasswordResetEmail(email || firebase.auth().currentUser.email);
        data.message = 'Password reset link has been sent. Verify your inbox!'
    } catch (error) {
        switch (error.code) {
            case 'auth/user-not-found': {
                data.message = 'User not found！'
                break;
            }
            default: { data.message = error.message }
        }
        return data;
    }
    return data;
}

export const signOut = async () => {
    try {
        return await firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
}

export const getUserInfo = () => {
    return firebase.auth().currentUser;
}

export const updateUserInfo = async (data) => {
    let obj = {
        displayName: data.displayName,
        photoURL: data.photoURL
    }
    try {
        return await firebase.auth().currentUser.updateProfile(obj);
    } catch (e) {
        console.log(e);
    }
}

export const onlineMember = () => {
    return db.ref('/OnlineMember/');
}

export const updateOnlineMember = async (val) => {
    const onlineMember =  db.ref('/OnlineMember/');
    await new Promise((res)=>{
        onlineMember.set({userName:!val?'一位匿名會員':val});
        res(val);
     });
}

export const getCharRoomInfo = ()=>{
    return db.ref('/CharRoom/');
}

export const saveNewMsg = async (msgObj) => {
    return await getCharRoomInfo().push(msgObj);
}
