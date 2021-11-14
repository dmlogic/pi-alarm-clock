#!/usr/bin/bash

# usage:
# ./download.sh FULL_YOUTUBE_URL UNIQUE_TARGET_NAME

youtube-dl -f 140 $1 -o "download.m4a"
TARGET="/var/www/html/audio/${2}.mp3"
ALARMFILE="/var/www/html/alarm_file.js"


ffmpeg -i download.m4a download.mp3
sudo mv download.mp3 $TARGET

sudo rm $ALARMFILE
echo "const alarm_file = '/audio/${2}.mp3'" > $ALARMFILE
# now will need at least a restart, possibly a power off if voltage flaky

