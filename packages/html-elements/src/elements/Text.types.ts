import { TextProps } from 'expo-text';
import { ViewProps } from 'expo-view';

export type QuoteProps = React.PropsWithChildren<TextProps & { cite?: string }>;

export type BlockQuoteProps = React.PropsWithChildren<ViewProps & { cite?: string }>;

export type TimeProps = React.PropsWithChildren<TextProps & { dateTime?: string }>;

export type LinkProps = React.PropsWithChildren<
  TextProps & {
    /** @platform web */
    href?: string;
    /** @platform web */
    target?: string;
  }
>;
