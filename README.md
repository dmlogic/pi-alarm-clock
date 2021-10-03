# Raspberry PI alarm clock and weather station

This project will replace the original [PI weather clock](https://github.com/dmlogic/pi-clock-and-weather) with a VueJS app running in kiosk mode.

Ability to set of alarm time and play of sound through a connected speaker will be added.

## Time and date

These pick up from the RasPi itself. It is assumed that the PI is set to the appropriate UK timezone to work with MetOffice.

## Weather

This is supplied via MetOffice datapoint. An API key and latitude/longitude coordinates must be provided in a .env file.

I use MetOffice as I find it accurate and there is a weather station round the corner from my house. It wouldn't be a big job to add a data transformation layer to WeatherService.js to work with data from somewhere else.

Weather is provided as:

-   A min and max temperature for the current day
-   Forecast summary for the next 24 hours in 3-hour intervals
-   Alerts badges on key weather events: High UV, Cold and Rain

## Audio

Look into this:
google-chrome --autoplay-policy=no-user-gesture-required --kiosk
