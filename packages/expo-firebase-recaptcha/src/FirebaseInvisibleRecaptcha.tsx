import { CodedError } from '@unimodules/core';
import * as React from 'react';
import { StyleSheet, View, Text, Linking, TextStyle, StyleProp } from 'react-native';

import FirebaseRecaptcha from './FirebaseRecaptcha';
import { FirebaseAuthApplicationVerifier } from './FirebaseRecaptcha.types';
import FirebaseRecaptchaVerifierModal from './FirebaseRecaptchaVerifierModal';

interface Props extends Omit<React.ComponentProps<typeof FirebaseRecaptcha>, 'onVerify'> {
  title?: string;
  cancelLabel?: string;
  textStyle?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
}

interface State {
  loaded: boolean;
  verify: boolean;
  resolve?: (token: string) => void;
  reject?: (error: Error) => void;
}

export default class FirebaseInvisibleRecaptcha extends React.Component<Props, State>
  implements FirebaseAuthApplicationVerifier {
  state: State = {
    loaded: false,
    verify: false,
    resolve: undefined,
    reject: undefined,
  };

  private applicationVerifier: FirebaseAuthApplicationVerifier | null = null;

  get type(): string {
    return 'recaptcha';
  }

  async verify(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.setState({
        verify: true,
        resolve,
        reject,
      });
    });
  }

  render() {
    const { style, textStyle, linkStyle, children, ...otherProps } = this.props;
    const { verify, loaded } = this.state;
    return (
      <View style={style}>
        {children ? (
          children
        ) : (
          <Text style={[styles.text, textStyle]}>
            This app is protected by reCAPTCHA and the Google
            <Text
              style={[styles.link, linkStyle]}
              onPress={() => Linking.openURL('https://policies.google.com/privacy')}>
              &nbsp;Privacy Policy&nbsp;
            </Text>
            and
            <Text
              style={[styles.link, linkStyle]}
              onPress={() => Linking.openURL('https://policies.google.com/terms')}>
              &nbsp;Terms of Service&nbsp;
            </Text>
            apply.
          </Text>
        )}
        <FirebaseRecaptcha
          style={styles.content}
          {...otherProps}
          onLoad={this.onLoad}
          onError={this.onError}
          onVerify={this.onVerify}
          onFullChallenge={this.onFullChallenge}
          invisible
          verify={verify && loaded}
        />
        <FirebaseRecaptchaVerifierModal
          ref={ref => (this.applicationVerifier = ref)}
          {...otherProps}
          onError={this.onError}
        />
      </View>
    );
  }

  private onLoad = () => {
    this.setState({
      loaded: true,
    });
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  private onError = () => {
    const { reject } = this.state;
    if (reject) {
      reject(new CodedError('ERR_FIREBASE_RECAPTCHA_ERROR', 'Failed to load reCAPTCHA'));
    }
  };

  private onFullChallenge = async () => {
    this.setState({
      verify: false,
    });
    try {
      // @ts-ignore
      const token = await this.applicationVerifier.verify();
      const { resolve } = this.state;
      if (resolve) {
        resolve(token);
      }
    } catch (e) {
      const { reject } = this.state;
      if (reject) {
        reject(e);
      }
    }
  };

  private onVerify = (token: string) => {
    const { resolve } = this.state;
    if (resolve) {
      resolve(token);
    }
    this.setState({
      verify: false,
    });
  };
}

const styles = StyleSheet.create({
  content: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 13,
    opacity: 0.5,
  },
  link: {
    color: 'blue',
  },
});
