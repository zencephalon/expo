import { StackNavigationProp } from '@react-navigation/stack';
import { Platform } from '@unimodules/core';
import * as StoreReview from 'expo-store-review';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import Colors from '../constants/Colors';

type Props = {
  navigation: StackNavigationProp<any>;
};

function getStoreUrlInfo(): string {
  const storeUrl = StoreReview.storeUrl();
  if (storeUrl) {
    return `On iOS <10.3, or Android devices pressing this button will open ${storeUrl}.`;
  }
  return 'You will need to add ios.appStoreUrl, and android.playStoreUrl to your app.config.js in order to use this feature on Android.';
}

function StoreReviewScreen({ navigation }: Props) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Store Review',
    });
  }, [navigation]);

  const [isAvailable, setAvailable] = React.useState<boolean>(false);

  React.useEffect(() => {
    StoreReview.isAvailableAsync().then(setAvailable);
  }, []);

  const isSupportedText = isAvailable ? 'is available' : 'is not available!';

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.isSupportedText}>Native Store Review {isSupportedText}</Text>
        <Text style={styles.storeUrlText}>{getStoreUrlInfo()}</Text>
      </View>

      <Button
        onPress={StoreReview.requestReview}
        style={styles.button}
        buttonStyle={!StoreReview.hasAction() ? styles.disabled : undefined}
        title="Request a Review!"
      />
      <Button
        buttonStyle={{ marginTop: 16 }}
        disabled={Platform.OS !== 'ios'}
        onPress={() => {
          StoreReview.presentPreviewAsync({
            itemId: 982107779,
          }).then(result => console.log('normal preview result:', result));
        }}
        style={styles.button}
        title="Preview another app"
      />
      <Button
        buttonStyle={{ marginTop: 16 }}
        disabled={Platform.OS !== 'ios'}
        onPress={() => {
          StoreReview.presentPreviewAsync({
            itemId: 98,
          })
            .then(result => console.log('invalid preview result:', result))
            .catch(error => {
              alert('Expected Error: ' + error.message);
              console.log('Expected iTunes error:', error);
            });
        }}
        style={styles.button}
        title="Preview invalid app"
      />
      <Button
        buttonStyle={{ marginTop: 16 }}
        disabled={Platform.OS !== 'ios'}
        onPress={() => {
          StoreReview.presentPreviewAsync({
            itemId: 98,
          })
            .then(result => console.log('unexpected preview result:', result))
            .catch(error => {
              alert('Expected Error: ' + error.message);
              console.log('Expected iTunes error:', error);
            });
          StoreReview.dismissPreviewAsync();
        }}
        style={styles.button}
        title="Cancel preview before it can load (unstable)"
      />
      <Button
        buttonStyle={{ marginVertical: 16 }}
        disabled={Platform.OS !== 'ios'}
        onPress={() => {
          StoreReview.presentPreviewAsync({
            itemId: 982107779,
          }).then(result => console.log('cancelled preview result:', result));
          setTimeout(() => {
            StoreReview.dismissPreviewAsync();
          }, 2000);
        }}
        style={styles.button}
        title="Dismiss preview in 2 seconds"
      />
    </View>
  );
}

StoreReviewScreen.navigationOptions = { title: 'Store Review' };

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: Colors.greyBackground,
  },
  textContainer: {
    marginBottom: 16,
  },
  isSupportedText: {
    color: Colors.tintColor,
    paddingVertical: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  storeUrlText: {
    color: Colors.secondaryText,
    fontSize: 14,
  },
  disabled: {
    backgroundColor: Colors.disabled,
  },
  button: {
    alignItems: 'flex-start',
  },
});

export default StoreReviewScreen;
