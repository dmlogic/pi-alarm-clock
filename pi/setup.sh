#!/usr/bin/bash

# Install Node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

nvm install 16

# Get the code
cd ~/ && git clone git@github.com:dmlogic/pi-alarm-clock.git
cd pi-alarm-clock
npm install
# Remember to populate the .env file here
npm run build

# We want a really tiny webserver
sudo apt-get install lighttpd
sudo cp -r ~/pi-alarm-clock/dist/* /var/www/html/

# we'll want to hide the mouse cursor
sudo apt install unclutter

# Turn off that LED
# add this to sudo cron
# @reboot echo 0 > /sys/devices/platform/leds/leds/led1/brightness
