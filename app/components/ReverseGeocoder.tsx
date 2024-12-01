import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Type for the response from the Geocoding API
interface GeocodeResponse {
  results: Array<{
    address_components: Array<{ 
      types: string[];
      long_name: string;
    }>;
  }>;
}

export const getZipCode = async (latitude: number, longitude: number): Promise<string | null> => {
  try {
    // Access your Google API key from the environment variables
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      throw new Error('Google API key is missing. Please check your .env file.');
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: GeocodeResponse = await response.json();

    // Ensure there are results in the response
    if (!data.results || data.results.length === 0) {
      throw new Error('No results found for the given coordinates');
    }

    // Find the postal code component in the results
    const zipCode = data.results[0].address_components.find((comp) =>
      comp.types.includes('postal_code')
    )?.long_name;

    // If no ZIP code is found, throw an error
    if (!zipCode) {
      throw new Error('ZIP code not found in the response');
    }

    return zipCode;

  } catch (error: unknown) { // Error is explicitly typed as 'unknown'
    // TypeScript error handling for unknown errors
    if (error instanceof Error) {
      // Now we know that error is an instance of Error
      console.error('Error in reverse geocoding:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    return null;  // Return null in case of error
  }
};
