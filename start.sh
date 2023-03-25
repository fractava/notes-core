#bin/#!/bin/sh

cd core
npm ci
cd ../dev-server/
npm ci
npm run dev
