#!/usr/bin/bash

# Turn off that LED
# add this to sudo cron
# @reboot echo 0 > /sys/devices/platform/leds/leds/led1/brightness

# Consider popping all this in /etc/xdg/lxsession/LXDE-pi/autostart

# Make it so the screen goes blank nice and quick
xset s 10

# Hide the mouse cursor
unclutter -idle 0 &

# Start the app, with audio playback allowed and in kiosk mode
chromium-browser --app=http://127.0.0.1 --autoplay-policy=no-user-gesture-required --kiosk
