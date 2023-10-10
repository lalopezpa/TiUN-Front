import {initializeApp} from 'firebase/app';
import {getStorage, ref, uploadBytes} from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyANDWCmr6JM0CD6lJCY_Knu-PYsADeYi-w',
	authDomain: 'tiun-175b2.firebaseapp.com',
	projectId: 'tiun-175b2',
	storageBucket: 'tiun-175b2.appspot.com',
	messagingSenderId: '714563315540',
	appId: '1:714563315540:web:da4565f21aeda7c0a18ac1',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
