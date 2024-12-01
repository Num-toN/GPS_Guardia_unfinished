import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const getZipCode = async (latitude: number, longitude: number) => {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;  // Access your Google API key

        if (!apiKey) {
            throw new Error('Google API key is missing');
        }

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();

        // Ensure there are results in the response
        if (!data.results || data.results.length === 0) {
            throw new Error('No results found for the given coordinates');
        }

        // Find the postal code component in the results
        const zipCode = data.results[0].address_components.find((comp: any) =>
            comp.types.includes('postal_code')
        )?.long_name;

        // If no ZIP code is found, throw an error
        if (!zipCode) {
            throw new Error('ZIP code not found in the response');
        }

        return zipCode;

    } catch (error) {
        console.error('Error in reverse geocoding:', error);
        return null;  // or handle error more gracefully
    }
};
