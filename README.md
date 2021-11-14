# Raspberry PI alarm clock and weather station

This project replaces the original [PI weather clock](https://github.com/dmlogic/pi-clock-and-weather) with a VueJS app running in kiosk mode.

Time, date, weather summary and weather alerts are displayed and you can set an alarm to play an mp3 of your choice to wake you up.

![Screenshot from 2021-11-14 08-13-18](https://user-images.githubusercontent.com/1250252/141673812-67a5889b-44d8-4359-a8fb-314a57e7f786.png)

## Time and date

These pick up from the RasPi itself. It is assumed that the PI is set to the appropriate UK timezone to work with MetOffice.

## Weather

This is supplied via MetOffice datapoint. You will need an [API key](https://www.metoffice.gov.uk/services/data/datapoint/api)

I use MetOffice as I find it accurate and there is a weather station round the corner from my house. It wouldn't be a big job to add a data transformation layer to WeatherService.js to work with data from somewhere else.

Weather is provided as:

-   A min and max temperature for the current day
-   Forecast summary for the next 24 hours in 3-hour intervals
-   Alerts badges on key weather events: High UV, Cold and Rain

## Alarm

A basic UI is available to set the days and time of the alarm. The sound defaults to an included generic "beep beep" noise. You may replace this with an mp3 of your choice by following the instructions below.

![Screenshot from 2021-11-14 08-13-36](https://user-images.githubusercontent.com/1250252/141673836-237c8e30-1e19-4bfe-926b-66ec81b0df1e.png)

# Installation and setup

You'll need a Raspberry PI with touchscreen and some sound output. A little [USB speaker](https://thepihut.com/products/mini-external-usb-stereo-speaker) is the simplest option.

Install the latest, full Raspbian and ensure GIT is installed and the desktop displays correctly.

Download [`setup.sh`](https://raw.githubusercontent.com/dmlogic/pi-alarm-clock/main/pi/setup.sh) file and run it as the `pi` user.

Copy `.env.sample` to `.env` and populate with your values.

Add the following crons via `sudo crontab -e`

```
@reboot echo 0 > /sys/devices/platform/leds/leds/led1/brightness
@reboot /home/pi/pi-alarm-clock/pi/test-audio.sh
```

Reboot the PI and see the alarm load.

## Changing the alarm tone to a music file.

Any source music file that the PI can play can be the alarm tone.

To override the default "beep beep", add the file `/var/www/html/alarm_file.js` with a single line:

```js
 const alarm_file = '/audio/yourfile.mp3'
 ```

You may also try the included [`download.sh`](https://github.com/dmlogic/pi-alarm-clock/blob/main/pi/download.sh) if you like.

The PI will need a restart after changing the audio.
