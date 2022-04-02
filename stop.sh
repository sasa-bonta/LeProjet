#!/bin/bash

kill -9 `sudo lsof -t -i:8080`
kill -9 `sudo lsof -t -i:3000`
kill -9 `sudo lsof -t -i:4000`

cd system-BE/
docker-compose down
cd ..