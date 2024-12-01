// crimeDataHelper.tsx
import crimeData from '../assets/data/crime_data.json'; // Example import from a JSON file

export const getCrimeCount = (zipCode: string): number => {
  // Example function to get crime count for a specific ZIP code
  const crimeEntry = crimeData.find((entry: any) => entry["Zip Code"] === parseFloat(zipCode));
  return crimeEntry ? crimeEntry["Crime Count"] : 0; // Return crime count or 0 if not found
};
