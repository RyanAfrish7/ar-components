#!/bin/bash

set -e

pwd
cd ..
npm install
npm run bootstrap --hoist
cd site
npm run setup
npm run build
