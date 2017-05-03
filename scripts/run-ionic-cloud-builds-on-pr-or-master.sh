#!/bin/bash
set -e

if [ "$TRAVIS_PULL_REQUEST" != "false" ] || [ "$TRAVIS_BRANCH" == "master" ]; then
  echo "Preparing project assets for upload:"
  npm run ionic:build

  echo "Submitting Android build:"
  ionic package build android --noresources --profile dev | tee android-submit.out
  androidBuildId=$(awk '/Build ID:/ {print $NF}' android-submit.out)

  echo "Submitting iOS build:"
  ionic package build ios --noresources --profile dev | tee ios-submit.out
  iosBuildId=$(awk '/Build ID:/ {print $NF}' ios-submit.out)

  echo "Awaiting build completion... "
  for i in $(seq 1 180); do
    sleep 2
    androidStatus=$(ionic package info "$androidBuildId" | awk '/status / {print $NF}')
    iosStatus=$(ionic package info "$iosBuildId" | awk '/status / {print $NF}')
    if [ "$androidStatus" == "SUCCESS" ] && [ "$iosStatus" == "SUCCESS" ]; then
      echo "Packaging successfull!"
			ionic package info "$androidBuildId"
			ionic package info "$iosBuildId"
      exit
    elif [ "$androidStatus" == "FAILED" ] || [ "$iosStatus" == "FAILED" ]; then
      echo "Packaging failed!"
			ionic package info "$androidBuildId"
			ionic package info "$iosBuildId"
      exit 1
    fi
  done
  echo "Packaging timed out after 6 minutes!"
  ionic package info "$androidBuildId"
  ionic package info "$iosBuildId"
  exit 1
fi
