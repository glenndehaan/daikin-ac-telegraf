# Daikin AC Telegraf

## Structure
- NodeJS
- daikin-controller

## What?
This tiny application provides a Telegraf input for collecting Daikin AC stats.

## Basic Usage
- Download the latest version from the releases page on GitHub
- Save the binary in the following new folder: `/opt/daikin-ac-telegraf`
- Make sure telegraf has execution rights
- Add the following config to the `telegraf.conf`:
```
[[inputs.exec]]
  commands = ["/opt/daikin-ac-telegraf/daikin-ac-telegraf-linux"]
  timeout = "30s"
  data_format = "influx"
```
- Restart the telegraf service

## Development Usage
- Install NodeJS 14.0 or higher
- Run `npm install` in the root project folder
- Run `npm start` in the root project folder

## Example output
The application will autodiscover up-to 5 AC units on the network.
The results will be output as InfluxDB Line format. See the example below:

```
daikinAc,ip=192.168.11.174,name=Bedroom,macAddress=XXXXXXXXX power=false,targetTemperature=21,fanRate=4,indoorTemperature=10,outdoorTemperature=-1,todayRuntime=0
daikinAc,ip=192.168.11.173,name=Guest Room,macAddress=XXXXXXXXX power=false,targetTemperature=18,fanRate=4,indoorTemperature=6,outdoorTemperature=0,todayRuntime=0
daikinAc,ip=192.168.11.126,name=Kitchen,macAddress=XXXXXXXXX power=false,targetTemperature=18,fanRate=5,indoorTemperature=19,outdoorTemperature=0,todayRuntime=0
daikinAc,ip=192.168.11.175,name=Livingroom,macAddress=XXXXXXXXX power=false,targetTemperature=25,fanRate=5,indoorTemperature=14,outdoorTemperature=0,todayRuntime=0
```

## License

MIT
