#!/usr/bin/bash
# The PI can be flaky with USB audio, especially if voltage is  borderline.
# Run this on boot and it ensures that a big warning is displayed if no
# playback device is found. Otherwise you just get no alarm
JSON="const audio_available = false;"
OUTPUT=$(aplay -l)

if [[ $OUTPUT == *"device 0:"* ]]; then
    JSON="const audio_available = true;"
fi
echo "${JSON}" > "/var/www/html/audio_status.js"
