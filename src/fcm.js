import "firebase/messaging";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBXRqsj0zwavJtRwzKHjxOMmxZKfhjfYec",
    authDomain: "layanan-kependudukan.firebaseapp.com",
    projectId: "layanan-kependudukan",
    storageBucket: "layanan-kependudukan.appspot.com",
    messagingSenderId: "133524587104",
    appId: "1:133524587104:web:8e2c196d923128ad32b905",
    measurementId: "G-0PWHKBP551",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    return getToken(messaging, {
        vapidKey:
            "BBYx-vHcqeoTQEWAupl3Sz_Cwh_ll2VKeyxcNxJEHOVLKIFLwz08t0jScvK9QbMe74bPWC9hqv1vkyIlSoxlsKM",
    })
        .then((currentToken) => {
            if (currentToken) {
                console.log("current token for client: ", currentToken);
                return currentToken;
            } else {
                // Show permission request UI
                console.log(
                    "No registration token available. Request permission to generate one."
                );
                return "";
            }
        })
        .catch((err) => {
            return "";
            console.log("An error occurred while retrieving token. ", err);
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log(payload);
            resolve(payload);
        });
    });
