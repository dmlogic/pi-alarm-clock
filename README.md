# Raspberry PI alarm clock and weather station

This project replaces the original [PI weather clock](https://github.com/dmlogic/pi-clock-and-weather) with a VueJS app running in kiosk mode.

Time, date, weather summary and weather alerts are displayed and you can set an alarm to play an mp3 of your choice to wake you up.

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

A basic UI is available to set the days and time of the alarm. The sound defaults to an included generic "beep beep". You may replace this with an mp3 of your choice by adjusting the contents of `alarm_file.js` and restarting.

# Installation and setup

You'll need a Raspberry PI with touchscreen and some sound output. A little USB speaker is the simplest option.

Install the latest, full Raspbian and ensure GIT is installed and the desktop displays correctly.

Grab the `setup.sh` file from the pi folder and run it as the `pi` user.

Copy `.env.sample` to `.env` and populate with your values.

Add the following crons via `sudo crontab -e`

```
@reboot echo 0 > /sys/devices/platform/leds/leds/led1/brightness
@reboot /home/pi/pi-alarm-clock/pi/test-audio.sh
```

Reboot the PI and see the alarm load.

