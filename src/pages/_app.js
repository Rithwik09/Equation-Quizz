// pages/_app.js

import { useEffect } from 'react';
import { firebaseConfig } from '../lib/firebase'; // Import Firebase configuration
import firebase from 'firebase/app';
import 'firebase/auth'; // Include Firebase Authentication
import '../styles/globals.css'; // Global styles

// Initialize Firebase only once
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('User is signed in:', user);
            } else {
                console.log('No user is signed in');
            }
        });

        return () => unsubscribe();
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
