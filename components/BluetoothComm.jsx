import {Text, View, StyleSheet} from 'react-native';

const BluetoothComm = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.title}>1. Bluetooth Communication</Text>
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

export default BluetoothComm;
