import {
  FirebaseAuthApplicationVerifier,
  FirebaseRecaptchaVerifierModal,
  FirebaseInvisibleRecaptcha,
} from 'expo-firebase-recaptcha';
import * as React from 'react';
import { Alert, ScrollView, StyleSheet, StyleProp, TextStyle, Text } from 'react-native';

import HeadingText from '../components/HeadingText';
import ListButton from '../components/ListButton';

const firebaseConfig = {
  apiKey: 'AIzaSyDKP919EwHK1U3Q1bgJdQEwZCHs_z6lEK4',
  authDomain: 'expo-firebase-demo.firebaseapp.com',
  databaseURL: 'https://expo-firebase-demo.firebaseio.com',
  projectId: 'expo-firebase-demo',
  storageBucket: 'expo-firebase-demo.appspot.com',
  messagingSenderId: '192261076942',
  appId: '1:192261076942:web:0bc88d1971ffb0c1359d9f',
  measurementId: 'G-10P86NHER4',
};

interface State {
  title?: string;
  cancelLabel?: string;
  firebaseConfig?: any;
  inProgress: 'none' | 'modal' | 'invisible';
  textStyle?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
  customBanner?: React.ReactElement;
}

export default class FirebaseRecaptchaScreen extends React.Component<object, State> {
  static navigationOptions = {
    title: 'FirebaseRecaptcha',
  };

  state: State = {
    firebaseConfig,
    inProgress: 'none',
    textStyle: undefined,
    linkStyle: undefined,
    customBanner: undefined,
  };

  invisibleRecaptcha: FirebaseAuthApplicationVerifier | null = null;
  modalRecaptcha: FirebaseAuthApplicationVerifier | null = null;

  render() {
    const {
      title,
      cancelLabel,
      firebaseConfig,
      inProgress,
      textStyle,
      linkStyle,
      customBanner,
    } = this.state;
    const modalProps: any = {
      ...(title && { title }),
      ...(cancelLabel && { cancelLabel }),
      ...(firebaseConfig && { firebaseConfig }),
    };
    return (
      <ScrollView style={{ padding: 10 }}>
        <HeadingText>Modal based reCAPTCHA</HeadingText>
        <ListButton
          onPress={() => this.requestRecaptchaToken(this.modalRecaptcha)}
          title="Request reCAPTCHA token"
        />
        <ListButton
          onPress={() => this.setState({ title: 'Prove you are human!' })}
          title="Set custom title"
        />
        <ListButton
          onPress={() => this.setState({ cancelLabel: 'Close' })}
          title="Set custom cancel label"
        />
        <ListButton
          onPress={() => this.setState({ title: undefined })}
          title="Reset custom title"
        />
        <ListButton
          onPress={() => this.setState({ cancelLabel: undefined })}
          title="Reset custom cancel label"
        />
        <FirebaseRecaptchaVerifierModal ref={ref => (this.modalRecaptcha = ref)} {...modalProps} />

        <HeadingText>Invisible reCAPTCHA</HeadingText>
        <ListButton
          onPress={() => this.requestRecaptchaToken(this.invisibleRecaptcha)}
          title={
            inProgress === 'invisible' ? 'Requesting reCAPTCHA token...' : 'Request reCAPTCHA token'
          }
        />
        <ListButton
          onPress={() => this.setState({ textStyle: styles.invisibleRecaptchaText })}
          title="Set custom text-style"
        />
        <ListButton
          onPress={() => this.setState({ linkStyle: styles.invisibleRecaptchaLink })}
          title="Set custom link-style"
        />
        <ListButton
          onPress={() => this.setState({ customBanner: <Text>Custom reCAPTCHA banner</Text> })}
          title="Set custom banner"
        />
        <ListButton
          onPress={() => this.setState({ textStyle: undefined })}
          title="Reset custom text-style"
        />
        <ListButton
          onPress={() => this.setState({ linkStyle: undefined })}
          title="Reset custom link-style"
        />
        <ListButton
          onPress={() => this.setState({ customBanner: undefined })}
          title="Reset custom banner"
        />
        <FirebaseInvisibleRecaptcha
          ref={ref => (this.invisibleRecaptcha = ref)}
          style={styles.invisibleRecaptcha}
          textStyle={textStyle}
          linkStyle={linkStyle}
          children={customBanner}
          {...modalProps}
        />
      </ScrollView>
    );
  }

  private async requestRecaptchaToken(verifier: FirebaseAuthApplicationVerifier | null) {
    this.setState({ inProgress: verifier === this.invisibleRecaptcha ? 'invisible' : 'modal' });
    try {
      // @ts-ignore
      const token = await verifier.verify();
      setTimeout(
        () =>
          Alert.alert('Congratulations, you are not a bot! 🧑', `token: ${token.slice(0, 10)}...`),
        1000
      );
    } catch (e) {
      setTimeout(() => Alert.alert('Error!', e.message), 1000);
    }
    setTimeout(() => this.setState({ inProgress: 'none' }), 1000);
  }
}

const styles = StyleSheet.create({
  invisibleRecaptcha: {
    marginVertical: 10,
  },
  invisibleRecaptchaText: {
    opacity: 1,
    fontSize: 14,
  },
  invisibleRecaptchaLink: {
    fontWeight: 'bold',
    color: 'purple',
  },
});
