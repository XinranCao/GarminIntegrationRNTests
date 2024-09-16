import {SafeAreaView, ScrollView, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import BluetoothComm from './components/BluetoothComm';
import GarminConnectSDK from './components/GarminConnectSDK';
import AppleHealthKit from './components/AppleHealthKit';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <BluetoothComm />
          <GarminConnectSDK />
          <AppleHealthKit />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
