import React, { useState } from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
import { getGPSCoordinates } from '../components/GPSFetcher';  // Function to get GPS coordinates from the phone
import { getZipCode } from '../components/ReverseGeocoder';  // Reverse geocoding to get ZIP code
import { getCrimeCount } from '../components/CrimeMapper';  // Mapping ZIP code to crime count
import { sendCrimeCount } from '../components/BLECommunicator';  // Function to send crime count to ESP32

const HomeScreen = () => {
  const [crimeCount, setCrimeCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);  // State to manage loading indicator
  const [error, setError] = useState<string | null>(null);  // State for error messages

  const handleCrimeDataProcess = async () => {
    setIsLoading(true);
    setError(null);  // Clear previous errors

    try {
      // Get GPS coordinates from the phone
      const location = await getGPSCoordinates();
      
      // Check if location is valid before accessing latitude and longitude
      if (location && location.latitude && location.longitude) {
        const { latitude, longitude } = location;

        // Reverse geocode to get ZIP code
        const zipCode = await getZipCode(latitude, longitude);

        if (!zipCode) {
          throw new Error("ZIP code not found");
        }

        // Map ZIP code to crime count
        const count = getCrimeCount(zipCode);

        // Update crime count state
        setCrimeCount(count);

        // Send the crime count to ESP32 device via BLE
        const deviceId = 'YOUR_ESP32_DEVICE_ID';  // Replace with your actual ESP32 device ID
        await sendCrimeCount(count, deviceId);
      } else {
        throw new Error('Unable to retrieve GPS coordinates');
      }
    } catch (error) {
      // Handle any errors that occur
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);  // Set loading to false when the process is complete
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crime Count Tracker</Text>
      
      {/* Show loading indicator if data is being fetched */}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Text style={styles.crimeCountText}>
          Crime Count: {crimeCount !== null ? crimeCount : "No data yet"}
        </Text>
      )}

      {/* Display error message if there is an error */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button title="Fetch Crime Data" onPress={handleCrimeDataProcess} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  crimeCountText: {
    fontSize: 18,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default HomeScreen;
