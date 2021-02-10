/**
 * Import vendor modules
 */
const {discover: DaikinDiscover, DaikinAC} = require('daikin-controller');

/**
 * Daikin utils
 */
const daikin = {
    /**
     * Discovers all available Daikin AC's on the network
     *
     * @returns {Promise<unknown>}
     */
    discover: () => {
        return new Promise((resolve) => {
            DaikinDiscover(5, (result) => {
                resolve(Object.keys(result));
            });
        });
    },

    /**
     * Connect to the AC
     *
     * @param ip
     * @returns {Promise<unknown>}
     */
    connect: (ip) => {
        return new Promise((resolve) => {
            const device = new DaikinAC(ip, {},(err) => {
                if(err) {
                    resolve(undefined);
                    return;
                }

                resolve(device);
            });
        });
    },

    /**
     * Get AC info
     *
     * @param device
     * @returns {Promise<unknown>}
     */
    getInfo: (device) => {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            const basic = await daikin.getBasicInfo(device);
            const status = await daikin.getStatusInfo(device);
            const sensor = await daikin.getSensorInfo(device);
            const power = await daikin.getPowerInfo(device);

            resolve({
                basic,
                status,
                sensor,
                power
            });
        });
    },

    /**
     * Get AC basic info
     *
     * @param device
     * @returns {Promise<unknown>}
     */
    getBasicInfo: (device) => {
        return new Promise((resolve) => {
            device.getCommonBasicInfo((err, data) => {
                if(err) {
                    resolve(undefined);
                    return;
                }

                resolve(data);
            });
        });
    },

    /**
     * Get AC status info
     *
     * @param device
     * @returns {Promise<unknown>}
     */
    getStatusInfo: (device) => {
        return new Promise((resolve) => {
            device.getACControlInfo((err, data) => {
                if(err) {
                    resolve(undefined);
                    return;
                }

                resolve(data);
            });
        });
    },

    /**
     * Get AC sensor info
     *
     * @param device
     * @returns {Promise<unknown>}
     */
    getSensorInfo: (device) => {
        return new Promise((resolve) => {
            device.getACSensorInfo((err, data) => {
                if(err) {
                    resolve(undefined);
                    return;
                }

                resolve(data);
            });
        });
    },

    /**
     * Get AC power info
     *
     * @param device
     * @returns {Promise<unknown>}
     */
    getPowerInfo: (device) => {
        return new Promise((resolve) => {
            device.getACWeekPower((err, data) => {
                if(err) {
                    resolve(undefined);
                    return;
                }

                resolve(data);
            });
        });
    }
};

/**
 * Export the daikin utils
 */
module.exports = daikin;
