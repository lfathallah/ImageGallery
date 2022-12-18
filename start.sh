#!/bin/sh
 docker build -t ig-app-image . &&
 docker run -d -p 4200:80 ig-app-image
