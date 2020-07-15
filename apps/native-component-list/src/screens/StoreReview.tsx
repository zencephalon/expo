import { StackNavigationProp } from '@react-navigation/stack';
import * as StoreReview from 'expo-store-review';
import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

import Button from '../components/Button';
import Colors from '../constants/Colors';
import { Platform } from '@unimodules/core';

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
          StoreReview.presentPreviewAsync({ itemId: 1332439319 });
        }}
        style={styles.button}
        title="Preview another app"
      />
      <Button
        buttonStyle={{ marginVertical: 16 }}
        disabled={Platform.OS !== 'ios'}
        onPress={() => {
          setTimeout(() => {
            StoreReview.dismissPreviewAsync();
          }, 5000);
        }}
        style={styles.button}
        title="Dismiss preview in 5 seconds"
      />
      {Platform.OS === 'ios' && <UpdateTintTextInput />}
    </View>
  );
}

function UpdateTintTextInput() {
  const [value, setValue] = React.useState(Colors.tintColor);

  React.useEffect(() => {
    try {
      StoreReview.setTintColor(value);
    } catch {}
  }, []);
  return (
    <TextInput
      style={{
        padding: 10,
        width: 100,
        color: 'black',
      }}
      onSubmitEditing={() => {
        StoreReview.setTintColor(value);
      }}
      onChangeText={setValue}
      value={value}
    />
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
