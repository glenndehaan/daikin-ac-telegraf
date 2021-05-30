/**
 * Import own modules
 */
const daikin = require('./utils/daikin');

/**
 * Main program function
 */
const run = async () => {
    // Discover AC's on the network
    const devices = await daikin.discover();

    // Loop over all devices
    for(let item = 0; item < devices.length; item++) {
        // Define device
        const device = devices[item];
        // Connect to the device
        const result = await daikin.connect(device);

        // Check if the device is connected successfully
        if(typeof result !== "undefined") {
            // Get the device info
            const data = await daikin.getInfo(result);
            console.log(`daikinAc,ip=${device},name=${data.basic.name},macAddress=${data.basic.macAddress} power=${data.status.power ? 1 : 0},targetTemperature=${isNaN(data.status.targetTemperature) ? 0 : data.status.targetTemperature},fanRate=${typeof data.status.fanRate !== "number" ? 0 : data.status.fanRate},indoorTemperature=${data.sensor.indoorTemperature},outdoorTemperature=${data.sensor.outdoorTemperature},todayRuntime=${data.power.todayRuntime}`);
        }
    }
};

/**
 * Execute program
 */
run().catch((e) => {
    console.error(e);
    process.exit(1);
});
