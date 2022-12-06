#!/bin/sh
 docker build -t ig-app-image . &&
 docker run -d -p 8080:80 ig-app-image
