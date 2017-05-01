#!/bin/bash
set -ev

if [ "$TRAVIS_PULL_REQUEST" != "false" ] || [ "$TRAVIS_BRANCH" == "master" ]; then
  npm run ionic:build && ionic package build android --noresources --profile dev && ionic package build ios --noresources --profile dev
  rc=$?
fi

exit $rc
