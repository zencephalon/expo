import { Auth } from './types';
import AuthProvider from './AuthProvider';
/**
 * Signs-in using the given provider.
 * @param provider
 */
export default function signInWithProvider(auth: Auth, provider: AuthProvider): void;
