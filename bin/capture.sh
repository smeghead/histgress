#!/bin/bash
# crontab
# */10 * * * * /home/smeghead/work/node/histgress/bin/capture.sh  
date

filename_tmp=$(dirname $0)/.ingress.png
caps_dir=$(dirname $0)/../public/caps/$(date +%Y%m%d)

mkdir -p $caps_dir
filename=$caps_dir/$(date +%H%M).png

echo "filename_tmp:$filename_tmp"
echo "filename:$filename"

sleep $(($RANDOM % 30))
killall Xvfb
killall firefox

export DISPLAY=:1.0
/usr/bin/Xvfb :1 -screen 0 1600x1600x24 &
/usr/bin/firefox &
echo "firefox start"

sleep 20
echo "open url"
/usr/bin/firefox -remote "openurl(https://www.ingress.com/intel?ll=34.841397,138.281063&z=14)"

sleep 90
echo "capture"
/usr/bin/import -window root -silent $filename_tmp

echo "crop"
/usr/bin/convert -crop 1500x1100+30+266 $filename_tmp $filename
/usr/local/bin/pngquant --ext .png --speed 1 $filename --force
killall firefox

rm $filename_tmp
echo "end"
