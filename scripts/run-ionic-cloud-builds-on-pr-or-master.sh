#!/bin/bash
set -e

PATH="$(dirname $0)/../node_modules/ionic/bin:$PATH"

if [ "$TRAVIS_PULL_REQUEST" != "false" ] || [ "$TRAVIS_BRANCH" == "master" ]; then
  echo "Logging in:"
  ionic login "$IONIC_EMAIL" "$IONIC_PASSWORD"

  echo "Submitting Android build:"
  ionic package build android --noresources --profile dev | tee android-submit.out
  androidBuildId=$(awk '/ Build / {print $3}' android-submit.out)

  echo "Submitting iOS build:"
  ionic package build ios --noresources --profile dev | tee ios-submit.out
  iosBuildId=$(awk '/ Build / {print $3}' ios-submit.out)

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
