import { CodedError } from '@unimodules/core';
import * as React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Modal, ActivityIndicator, } from 'react-native';
import FirebaseRecaptcha from './FirebaseRecaptcha';
let FirebaseRecaptchaVerifierModal = /** @class */ (() => {
    class FirebaseRecaptchaVerifierModal extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                token: '',
                visible: false,
                visibleLoaded: false,
                invisibleLoaded: false,
                invisibleVerify: false,
                resolve: undefined,
                reject: undefined,
            };
            this.onVisibleLoad = () => {
                this.setState({
                    visibleLoaded: true,
                });
            };
            this.onInvisibleLoad = () => {
                this.setState({
                    invisibleLoaded: true,
                });
            };
            this.onFullChallenge = async () => {
                this.setState({
                    invisibleVerify: false,
                    visible: true,
                });
            };
            this.onError = () => {
                const { reject } = this.state;
                if (reject) {
                    reject(new CodedError('ERR_FIREBASE_RECAPTCHA_ERROR', 'Failed to load reCAPTCHA'));
                }
                this.setState({
                    visible: false,
                    invisibleVerify: false,
                });
            };
            this.onVerify = (token) => {
                const { resolve } = this.state;
                if (resolve) {
                    resolve(token);
                }
                this.setState({
                    visible: false,
                    invisibleVerify: false,
                });
            };
            this.cancel = () => {
                const { reject } = this.state;
                if (reject) {
                    reject(new CodedError('ERR_FIREBASE_RECAPTCHA_CANCEL', 'Cancelled by user'));
                }
                this.setState({
                    visible: false,
                });
            };
            this.onDismiss = () => {
                // onDismiss should be called when the user dismisses the
                // modal using a swipe gesture. Due to a bug in RN this
                // unfortunately doesn't work :/
                //https://github.com/facebook/react-native/issues/26892
                if (this.state.visible) {
                    this.cancel();
                }
            };
        }
        static getDerivedStateFromProps(props, state) {
            if (!props.invisible && state.invisibleLoaded) {
                return {
                    invisibleLoaded: false,
                    invisibleVerify: false,
                };
            }
            return null;
        }
        get type() {
            return 'recaptcha';
        }
        async verify() {
            return new Promise((resolve, reject) => {
                if (this.props.invisible) {
                    this.setState({
                        token: '',
                        invisibleVerify: true,
                        resolve,
                        reject,
                    });
                }
                else {
                    this.setState({
                        token: '',
                        visible: true,
                        visibleLoaded: false,
                        resolve,
                        reject,
                    });
                }
            });
        }
        render() {
            const { title, cancelLabel, invisible, ...otherProps } = this.props;
            const { visible, visibleLoaded, invisibleLoaded, invisibleVerify } = this.state;
            return (React.createElement(View, { style: styles.container },
                invisible && (React.createElement(FirebaseRecaptcha, Object.assign({}, otherProps, { style: styles.invisible, onLoad: this.onInvisibleLoad, onError: this.onError, onVerify: this.onVerify, onFullChallenge: this.onFullChallenge, invisible: true, verify: invisibleLoaded && invisibleVerify }))),
                React.createElement(Modal, { visible: visible, animationType: "slide", presentationStyle: "pageSheet", onRequestClose: this.cancel, onDismiss: this.onDismiss },
                    React.createElement(SafeAreaView, { style: styles.modalContainer },
                        React.createElement(View, { style: styles.header },
                            React.createElement(Text, { style: styles.title }, title),
                            React.createElement(View, { style: styles.cancel },
                                React.createElement(Button, { title: cancelLabel || FirebaseRecaptchaVerifierModal.defaultProps.cancelLabel, onPress: this.cancel }))),
                        React.createElement(View, { style: styles.content },
                            React.createElement(FirebaseRecaptcha, Object.assign({}, otherProps, { style: styles.content, onLoad: this.onVisibleLoad, onError: this.onError, onVerify: this.onVerify })),
                            !visibleLoaded ? (React.createElement(View, { style: styles.loader },
                                React.createElement(ActivityIndicator, { size: "large" }))) : (undefined))))));
        }
    }
    FirebaseRecaptchaVerifierModal.defaultProps = {
        title: 'reCAPTCHA',
        cancelLabel: 'Cancel',
    };
    return FirebaseRecaptchaVerifierModal;
})();
export default FirebaseRecaptchaVerifierModal;
const styles = StyleSheet.create({
    container: {
        width: 0,
        height: 0,
    },
    invisible: {
        width: 300,
        height: 300,
    },
    modalContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: '#FBFBFB',
        height: 44,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#CECECE',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    cancel: {
        position: 'absolute',
        left: 8,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
//# sourceMappingURL=FirebaseRecaptchaVerifierModal.js.map