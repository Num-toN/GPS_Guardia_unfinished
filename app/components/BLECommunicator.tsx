import BleManager from 'react-native-ble-manager';

export const sendCrimeCount = async (crimeCount: number, deviceId: string) => {
    const serviceUUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
    const characteristicUUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

    try {
        await BleManager.write(deviceId, serviceUUID, characteristicUUID, [crimeCount]);
        console.log(`Sent crime count: ${crimeCount}`);
    } catch (error) {
        console.error('Error sending data:', error);
    }
};
