import { StyleSheet, Text, View } from 'react-native';

export default function CustomScreen() {
  return (
    <View style={styles.container}>
      <Text>Custom Affirmation Builder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
