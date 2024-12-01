import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  const [apiKey, setApiKey] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSave = () => {
    // Save settings (e.g., API key or user preferences)
    console.log(`API Key: ${apiKey}, Zip Code: ${zipCode}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter API Key"
        value={apiKey}
        onChangeText={setApiKey}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter ZIP Code"
        value={zipCode}
        onChangeText={setZipCode}
      />

      <Button title="Save Settings" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default SettingsScreen;
