#!/bin/bash
set -e

packageJson=$(npm version | head -1 | awk '{print $NF}' | sed "s/[',]//g")
configXml=$(grep '<widget' $(dirname $0)/../config.xml | head -1 | sed 's/.* version="\([^"]*\)".*/\1/')
loginTs=$(grep 'version: string =' $(dirname $0)/../src/pages/login/login.ts | head -1 | sed 's/.*version: string = '\''\([^'\'']*\)'\''.*/\1/')

if [ "$packageJson" == "$configXml" ] && [ "$packageJson" == "$loginTs" ] && [ "$configXml" == "$loginTs" ]; then
  echo "Versions are consistent."
else
  echo "Versions are inconsistent!"
  echo "  package.json:             $packageJson"
  echo "  config.xml:               $configXml"
  echo "  src/pages/login/login.ts: $loginTs"
  exit 1
fi
