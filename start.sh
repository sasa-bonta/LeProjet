#!/bin/bash

cd system-BE/
docker-compose up -d &
npm run start:dev &
cd ..

cd system-fe/
npm run serve --fix &
cd ..

cd awesomeImages/
go run main.go &