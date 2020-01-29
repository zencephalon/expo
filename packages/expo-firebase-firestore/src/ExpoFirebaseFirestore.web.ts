import { firestore, registerModule } from 'expo-firebase-app';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

registerModule('firestore', firebase);

export default firestore;
