import crimeData from '../assets/data/crime_data.json';

export const getCrimeCount = (zipCode: string) => {
    const zip = parseFloat(zipCode);
    const entry = crimeData.find((item) => item['Zip Code'] === zip);
    return entry ? entry['Crime Count'] : 0;
};
