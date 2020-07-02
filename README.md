# FRACTAVA Notes Core
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/fractava/notes-core)

__Currently Work in Progress__

The Core Libary of our Notes Apps.
It contains the Editor, but cannot run by itself.

## Dev Server
The Dev Server is used to get a development server that watches the libary files and lets you test the libary without pushing in to npm.
Its not a part of the package fractava/fractava-notes-core on npm.

If you use Gitpod the development server gets started automatically.

To start the dev server manually run:
- sudo sh start.sh

OR:

- cd core
- npm link
- cd ../dev-server
- npm install
- npm link @fractava/fractava-notes-core
- npm run serve

Now the Server runs on Port 8080
