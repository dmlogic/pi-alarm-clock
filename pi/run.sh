#!/usr/bin/bash

# Make it so the screen goes blank nice and quick
xset s 10

# Hide the mouse cursor
unclutter -idle 0 &

# Start the app, with audio playback allowed and in kiosk mode
chromium-browser --app=http://127.0.0.1 --incognito --autoplay-policy=no-user-gesture-required --kiosk

