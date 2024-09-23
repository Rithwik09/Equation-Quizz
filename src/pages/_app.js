import { useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import firebaseConfig from '../lib/firebase'; 
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Initialize Firebase only if there are no apps already initialized
        if (!getApps().length) {
            initializeApp(firebaseConfig);
        }
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
