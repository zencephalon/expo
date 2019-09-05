import { Audio } from 'expo-av';
import * as Battery from 'expo-battery';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const soundObject = new Audio.Sound();

function isCharging(state) {
  return [Battery.BatteryState.CHARGING, Battery.BatteryState.FULL].includes(state);
}

const standardImages = [
  require('./goku/dying-goku.gif'),
  require('./goku/sad-goku.jpg'),
  require('./goku/default-goku.png'),
  require('./goku/amused-goku.gif'),
  require('./goku/happy-goku.jpg'),
  require('./goku/extra-happy-goku.gif'),
];

const chargingImages = [
  require('./goku/really-sad-goku.gif'),
  // require('./goku/powering.gif'),
  require('./goku/half-power-goku.gif'),
  require('./goku/more-power-goku.gif'),
  require('./goku/full-power-goku.gif'),
  require('./goku/fuller-power-goku.gif'),
];

function getPowerLevelImage(level) {
  if (level === 0.69) {
    return require('./goku/thumbs-up-goku.gif');
  }
  return getRelativeLevelImage(level, standardImages);
}
function getRelativeLevelImage(value, images) {
  const amount = Math.floor(images.length * value);
  const index = Math.max(0, Math.min(amount, images.length - 1));
  return images[index];
}

function getChargingLevelImage(level) {
  if (level === 0.69) {
    return require('./goku/thumbs-up-goku.gif');
  }
  return getRelativeLevelImage(level, chargingImages);
}

export default function BatteryScreen() {
  if (!Battery.isSupported) {
    return <Text>Battery API is not supported on this device :p</Text>;
  }

  const [isLoaded, setLoaded] = React.useState(false);
  const [batteryLevel, setBatteryLevel] = React.useState(-1);
  const [batteryState, setBatteryState] = React.useState(Battery.BatteryState.UNKNOWN);

  React.useEffect(() => {
    (async () => {
      try {
        await soundObject.loadAsync(require('./goku/gokuyelling.mp3'));
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      } finally {
        setLoaded(true);
      }

      const [batteryLevel, batteryState] = await Promise.all([
        Battery.getBatteryLevelAsync(),
        Battery.getBatteryStateAsync(),
      ]);

      setBatteryLevel(batteryLevel);
      setBatteryState(batteryState);
    })();
    const batteryLevelListener = Battery.addBatteryLevelListener(({ batteryLevel }) =>
      setBatteryLevel(batteryLevel)
    );
    const batteryStateListener = Battery.addBatteryStateListener(({ batteryState }) => {
      setBatteryState(batteryState);
    });

    let _setBatteryLevel = 0;
    setInterval(() => {
      // _setBatteryLevel += 0.1;
      setBatteryLevel(0.69);
    }, 1000);

    return () => {
      batteryLevelListener && batteryLevelListener.remove();
      batteryStateListener && batteryStateListener.remove();
    };
  }, []);

  React.useEffect(() => {
    try {
      if (isCharging(batteryState)) {
        soundObject.playAsync();
      } else {
        soundObject.stopAsync();
      }
    } finally {
    }
  }, [batteryState]);

  if (!isLoaded || batteryLevel === -1) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>Loading</Text>
      </View>
    );
  }
  const image = isCharging(batteryState)
    ? getChargingLevelImage(batteryLevel)
    : getPowerLevelImage(batteryLevel);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image style={StyleSheet.absoluteFill} source={image} />
      <FlashingText
        amount={batteryLevel}
        style={{ zIndex: 2, fontSize: 24, textAlign: 'center', fontWeight: 'bold' }}>
        {(batteryLevel * 100).toFixed(0)}% POWER
      </FlashingText>
    </View>
  );
}

const colors = ['red', 'blue', 'orange', 'yellow', 'green'];

function FlashingText({ amount, style, ...props }) {
  const [index, setIndex] = React.useState(0);
  const [color, setColor] = React.useState('black');

  React.useEffect(() => {
    let timeout;
    let index = 0;
    if (amount > 0.9) {
      timeout = setInterval(() => {
        setIndex(index);
        index++;
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [amount]);

  React.useEffect(() => {
    const nextColor = amount > 0.9 ? colors[index % colors.length] : 'black';
    setColor(nextColor);
  }, [amount, index]);

  return (
    <Text
      style={[
        {
          zIndex: 2,
          fontSize: 24,
          textAlign: 'center',
          color,
          fontWeight: 'bold',
          transform: [{ scale: 1.0 + amount }],
        },
        style,
      ]}
      {...props}
    />
  );
}
