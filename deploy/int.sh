#!/usr/bin/env bash

cp ./src/app/environment.ts ./src/app/environment.ts.bak
cp ./src/environments/environment.int.ts ./src/app/environment.ts
ionic cordova build browser
aws s3 sync ./www/ s3://ridepilot-driver-app-int --acl public-read  --region us-east-2 --profile ridepilot
mv ./src/app/environment.ts.bak ./src/app/environment.ts
