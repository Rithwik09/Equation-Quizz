import { initializeApp } from 'firebase/app';  
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyCeREG-QN3GtZuMZsnR3RrT-iv37pG4_Xo",
    authDomain: "testname-f0571.firebaseapp.com",
    projectId: "testname-f0571",
    storageBucket: "testname-f0571.appspot.com",
    messagingSenderId: "747699717192",
    appId: "1:747699717192:web:4bcc049361cbacfe35847d",
    measurementId: "G-18QSMGM0DD", 
};

const app = initializeApp(firebaseConfig);

// Export Auth instance
export const auth = getAuth(app);
export default app;
