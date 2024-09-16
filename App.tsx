import {SafeAreaView, ScrollView, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppleHealthKit from './components/AppleHealthKit';
import GarminHealthAPI from './components/GarminHealthAPI';

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
          <AppleHealthKit />
          <GarminHealthAPI />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
