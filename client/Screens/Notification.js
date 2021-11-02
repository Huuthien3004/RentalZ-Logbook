import React, {useState, useEffect} from 'react';
import { Button, Vibration, StyleSheet, Text, Alert, View} from 'react-native';
import { Audio } from 'expo-av';

const Alarm = () => {
  const [audioStatus, setAudioStatus] = useState(false);
  const [sound, setSound] = useState(new Audio.Sound());
  const createTwoButtonAlert = () =>
  Alert.alert(
    "This is a dialog box",
    "Requirement for Logbook section 1",
    [
      {
        text: "Ring a bell",
        onPress: () => setAudioStatus(true),
        style: "cancel"
      },
      { text: "Vibrate", onPress: () => Vibration.vibrate() || setAudioStatus(false) }
    ],
    { cancelable: false }
  );
  useEffect(() => {
    (async () => {
      console.log('status', audioStatus);
      if (audioStatus) {
        await sound.loadAsync(require('../assets/bell-ring.wav'));
        try {
          await sound.playAsync();
        } catch (e) {
          console.log(e);
        }
      } else {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
    })();
  }, [audioStatus]);

  return (
    <View style={styles.container}>
              <Text style={[styles.header, styles.paragraph]}>Notification API</Text>
     <Button title="Click me to open dialog box" onPress={createTwoButtonAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    paddingTop: 44,
    padding: 8,
  },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    textAlign: 'center',
  },
});


export default Alarm;