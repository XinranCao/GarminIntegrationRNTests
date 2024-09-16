import {Text, View, StyleSheet} from 'react-native';

const GarminHealthAPI = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.title}>2. Garmin Health API</Text>
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

export default GarminHealthAPI;
