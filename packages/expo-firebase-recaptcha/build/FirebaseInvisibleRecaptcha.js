import { CodedError } from '@unimodules/core';
import * as React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import FirebaseRecaptcha from './FirebaseRecaptcha';
import FirebaseRecaptchaVerifierModal from './FirebaseRecaptchaVerifierModal';
export default class FirebaseInvisibleRecaptcha extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            loaded: false,
            verify: false,
            resolve: undefined,
            reject: undefined,
        };
        this.applicationVerifier = null;
        this.onLoad = () => {
            this.setState({
                loaded: true,
            });
            if (this.props.onLoad) {
                this.props.onLoad();
            }
        };
        this.onError = () => {
            const { reject } = this.state;
            if (reject) {
                reject(new CodedError('ERR_FIREBASE_RECAPTCHA_ERROR', 'Failed to load reCAPTCHA'));
            }
        };
        this.onFullChallenge = async () => {
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
            }
            catch (e) {
                const { reject } = this.state;
                if (reject) {
                    reject(e);
                }
            }
        };
        this.onVerify = (token) => {
            const { resolve } = this.state;
            if (resolve) {
                resolve(token);
            }
            this.setState({
                verify: false,
            });
        };
    }
    get type() {
        return 'recaptcha';
    }
    async verify() {
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
        return (React.createElement(View, { style: style },
            children ? (children) : (React.createElement(Text, { style: [styles.text, textStyle] },
                "This app is protected by reCAPTCHA and the Google",
                React.createElement(Text, { style: [styles.link, linkStyle], onPress: () => Linking.openURL('https://policies.google.com/privacy') }, "\u00A0Privacy Policy\u00A0"),
                "and",
                React.createElement(Text, { style: [styles.link, linkStyle], onPress: () => Linking.openURL('https://policies.google.com/terms') }, "\u00A0Terms of Service\u00A0"),
                "apply.")),
            React.createElement(FirebaseRecaptcha, Object.assign({ style: styles.content }, otherProps, { onLoad: this.onLoad, onError: this.onError, onVerify: this.onVerify, onFullChallenge: this.onFullChallenge, invisible: true, verify: verify && loaded })),
            React.createElement(FirebaseRecaptchaVerifierModal, Object.assign({ ref: ref => (this.applicationVerifier = ref) }, otherProps, { onError: this.onError }))));
    }
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
//# sourceMappingURL=FirebaseInvisibleRecaptcha.js.map