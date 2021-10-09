#!/usr/bin/bash

# CRONS
# Turn off that LED
# @reboot echo 0 > /sys/devices/platform/leds/leds/led1/brightness
# Check sound card availability at startup
# @reboot /home/pi/pi-alarm-clock/pi/test-audio.sh

# Consider popping all this in /etc/xdg/lxsession/LXDE-pi/autostart

# Make it so the screen goes blank nice and quick
xset s 10

# Hide the mouse cursor
unclutter -idle 0 &

# Start the app, with audio playback allowed and in kiosk mode
chromium-browser --app=http://127.0.0.1 --autoplay-policy=no-user-gesture-required --kiosk
