import { CodedError, UnavailabilityError } from '@unimodules/core';
import base64 from 'base-64';
import invariant from 'invariant';

import {
  OAuthProps,
  OAuthRevokeOptions,
  OAuthServiceConfiguration,
  TokenResponse,
} from './AppAuth.types';
import ExpoAppAuth from './ExpoAppAuth';

export * from './AppAuth.types';

function isValidServiceConfiguration(config?: OAuthServiceConfiguration): boolean {
  return !!(
    config &&
    typeof config.authorizationEndpoint === 'string' &&
    typeof config.tokenEndpoint === 'string'
  );
}

function assertValidClientId(clientId?: string): void {
  if (typeof clientId !== 'string' || !clientId.length) {
    throw new CodedError(
      'ERR_APP_AUTH_INVALID_CONFIG',
      '`clientId` must be a string with more than 0 characters'
    );
  }
}

function assertValidProps({
  issuer,
  redirectUrl,
  clientId,
  serviceConfiguration,
}: OAuthProps): void {
  if (typeof issuer !== 'string' && !isValidServiceConfiguration(serviceConfiguration)) {
    throw new CodedError(
      'ERR_APP_AUTH_INVALID_CONFIG',
      'You must provide either an `issuer` or both `authorizationEndpoint` and `tokenEndpoint`'
    );
  }
  if (typeof redirectUrl !== 'string') {
    throw new CodedError('ERR_APP_AUTH_INVALID_CONFIG', '`redirectUrl` must be a string');
  }
  assertValidClientId(clientId);
}

async function _executeAsync(props: OAuthProps): Promise<TokenResponse> {
  if (!props.redirectUrl) {
    props.redirectUrl = getDefaultOAuthRedirect();
  }
  assertValidProps(props);
  return await ExpoAppAuth.executeAsync(props);
}

export function getDefaultOAuthRedirect(): string {
  return `${ExpoAppAuth.OAuthRedirect}:/oauthredirect`;
}

export async function authAsync(props: OAuthProps): Promise<TokenResponse> {
  if (!ExpoAppAuth.executeAsync) {
    throw new UnavailabilityError('expo-app-auth', 'authAsync');
  }
  return await _executeAsync(props);
}

export async function refreshAsync(
  props: OAuthProps,
  refreshToken: string
): Promise<TokenResponse> {
  if (!ExpoAppAuth.executeAsync) {
    throw new UnavailabilityError('expo-app-auth', 'refreshAsync');
  }
  if (!refreshToken) {
    throw new CodedError('ERR_APP_AUTH_TOKEN', 'Cannot refresh with null `refreshToken`');
  }
  return await _executeAsync({
    isRefresh: true,
    refreshToken,
    ...props,
  });
}

/**
 * A JS helper method to revoke refresh tokens and access tokens.
 *
 * @deprecated use `revokeTokenAsync` instead.
 */
// Mostly follows the opinion of react-native-app-auth: https://github.com/FormidableLabs/react-native-app-auth
export async function revokeAsync(
  {
    clientId,
    clientSecret,
    issuer,
    serviceConfiguration,
  }: Pick<OAuthProps, 'clientId' | 'clientSecret' | 'issuer' | 'serviceConfiguration'>,
  { token, isClientIdProvided = false }: OAuthRevokeOptions
): Promise<any> {
  let revocationEndpoint;
  if (serviceConfiguration && serviceConfiguration.revocationEndpoint) {
    revocationEndpoint = serviceConfiguration.revocationEndpoint;
  } else {
    // For Open IDC providers only.
    const response = await fetch(`${issuer}/.well-known/openid-configuration`);
    const openidConfig = await response.json();

    invariant(
      openidConfig.revocation_endpoint,
      'The OpenID config does not specify a revocation endpoint'
    );

    revocationEndpoint = openidConfig.revocation_endpoint;
  }

  return revokeTokenAsync(token, revocationEndpoint, {
    clientId,
    clientSecret,
    sendClientId: isClientIdProvided,
  });
}

/**
 * A JS helper method to revoke refresh tokens and access tokens.
 *
 * @param token access token or refresh token
 * @param revocationEndpoint url to invoke
 * @param options
 *   - clientId: Client ID to use
 *   - clientSecret: Optional client secret
 *   - sendClientId: Should the client ID be included in the revocation (defaults to `false`)
 */
export async function revokeTokenAsync(
  token: string,
  revocationEndpoint: string,
  {
    clientId,
    clientSecret,
    sendClientId = false,
  }: { clientId: string; clientSecret?: string; sendClientId: boolean }
) {
  if (!token) {
    throw new CodedError('ERR_APP_AUTH_TOKEN', 'Cannot revoke a null `token`');
  }

  assertValidClientId(clientId);

  const encodedToken = encodeURIComponent(token);
  const body = `token=${encodedToken}${
    sendClientId ? `&client_id=${encodeURIComponent(clientId)}` : ''
  }`;

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  if (clientSecret) {
    // @ts-ignore
    const basicAuthString = base64.encode(
      unescape(encodeURIComponent(`${clientId}:${clientSecret}`))
    );

    console.log('basicAuthString', basicAuthString);
    (headers as any).Authorization = `Basic ${basicAuthString}`;
  }

  try {
    // https://tools.ietf.org/html/rfc7009#section-2.2
    const results = await fetch(revocationEndpoint, {
      method: 'POST',
      headers,
      body,
    });

    return results;
  } catch (error) {
    throw new CodedError('ERR_APP_AUTH_REVOKE_FAILED', error.message);
  }
}

export const { OAuthRedirect, URLSchemes } = ExpoAppAuth;
