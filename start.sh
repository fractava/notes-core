#bin/#!/bin/sh

cd core
npm link
cd ../dev-server
npm install
npm link @fractava/fractava-notes-core
npm run serve
