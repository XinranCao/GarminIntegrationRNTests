import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  useColorScheme,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import AppleHealthKit from 'react-native-health';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const AppleHealthKitComp = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [steps, setSteps] = useState(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(null); // Store last updated time from HealthKit
  const textColor = isDarkMode ? Colors.white : Colors.black;

  useEffect(() => {
    new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
      'healthKit:StepCount:new',
      async () => {
        console.log('--> observer triggered');
        fake();
      },
    );
  });
  const fake = () => {
    let options = {
      startDate: new Date(2021, 0, 0).toISOString(),
      endDate: new Date().toISOString(),
      type: 'Walking', // one of: ['Walking', 'StairClimbing', 'Running', 'Cycling', 'Workout']
    };

    AppleHealthKit.getSamples(options, (err, results) => {
      if (err) {
        return;
      }
      console.log('results', result);
    });
  };

  useEffect(() => {
    requestHealthKitPermissions();
    startStepCountObserverQuery(); // Start observing step count changes
  }, []);

  const requestHealthKitPermissions = () => {
    const PERMISSIONS = {
      permissions: {
        read: [AppleHealthKit.Constants.Permissions.StepCount],
      },
    };

    AppleHealthKit.initHealthKit(PERMISSIONS, (err, results) => {
      if (err) {
        console.log('Error initializing HealthKit: ', err);
        return;
      }

      fetchSteps(); // Initial fetch
    });
  };

  const fetchSteps = () => {
    const options = {
      startDate: new Date(2023, 9, 1).toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log('Error fetching step count: ', err);
        return;
      }

      // Update state with new step count and last updated time
      setSteps(results.value);
      setLastUpdatedTime(new Date(results.endDate).toLocaleString()); // Convert last updated time to a readable format
    });
  };

  const startStepCountObserverQuery = () => {
    console.log('Observer started');

    // const eventEmitter = new NativeEventEmitter(NativeModules.AppleHealthKit);

    // if (!eventEmitter) {
    //   console.log('Failed to initialize NativeEventEmitter');
    //   return;
    // }
    // eventEmitter.addListener('healthKit:StepCount:setup:success', async () => {
    //   console.log('set up success');
    //   // fetchSteps(); // Fetch new step count
    // });

    // eventEmitter.addListener('healthKit:StepCount:setup:failure', async () => {
    //   console.log('set up fails');
    //   // fetchSteps(); // Fetch new step count
    // });

    // eventEmitter.addListener('healthKit:StepCount:new', async () => {
    //   console.log('--> observer triggered');
    //   fetchSteps(); // Fetch new step count
    // });

    // console.log(eventEmitter.listeners('healthKit:StepCount:new'));

    // eventEmitter.addListener('healthKit:StepCount:failure', async () => {
    //   console.log('--> observer triggered');
    // });
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.title, {color: textColor}]}>
        1. Apple Health Kit
      </Text>
      <View>
        <Text style={{color: textColor}}>
          Steps Today: {steps ? steps : 'Loading...'}
        </Text>
        <Text style={{color: textColor}}>
          Last Updated: {lastUpdatedTime ? lastUpdatedTime : 'N/A'}
        </Text>
        <Button title="Refresh Steps" onPress={fetchSteps} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default AppleHealthKitComp;
