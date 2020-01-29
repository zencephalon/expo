import { firestore, registerModule } from 'expo-firebase-app';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

registerModule('firestore', firebase);

export default firestore;
