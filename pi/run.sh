#!/usr/bin/bash

# Make it so the screen goes blank nice and quick
xset s 10

# Hide the mouse cursor
unclutter -idle 0 &

# Start the app, with audio playback allowed and in kiosk mode
#chromium-browser --incognito --app=http://127.0.0.1 --autoplay-policy=no-user-gesture-required --kiosk
chromium-browser --new-window --aggressive-cache-discard --autoplay-policy=no-user-gesture-required --kiosk  --disk-cache-size=0 http://127.0.0.1

