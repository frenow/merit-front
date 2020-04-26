import firebase from 'firebase';

export const initializeFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp({messagingSenderId: "609922366963"});
    }
};

export const askForPermissioToReceiveNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        await Notification.requestPermission();
        const token = await messaging.getToken();
        console.log('token: ', token);
        return token;
    } catch (error) {
        console.error(error);
    }
};