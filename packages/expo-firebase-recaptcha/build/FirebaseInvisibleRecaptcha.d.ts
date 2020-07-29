import * as React from 'react';
import { TextStyle, StyleProp } from 'react-native';
import FirebaseRecaptcha from './FirebaseRecaptcha';
import { FirebaseAuthApplicationVerifier } from './FirebaseRecaptcha.types';
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
export default class FirebaseInvisibleRecaptcha extends React.Component<Props, State> implements FirebaseAuthApplicationVerifier {
    state: State;
    private applicationVerifier;
    get type(): string;
    verify(): Promise<string>;
    render(): JSX.Element;
    private onLoad;
    private onError;
    private onFullChallenge;
    private onVerify;
}
export {};
