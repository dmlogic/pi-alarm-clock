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

# we'll probably want to download some cheeky music
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl
