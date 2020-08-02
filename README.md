[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod&style=flat-square)](https://gitpod.io/#https://github.com/fractava/notes-core)
[![npm](https://img.shields.io/npm/v/@fractava/fractava-notes-core?style=flat-square)](https://www.npmjs.com/package/@fractava/fractava-notes-core)
[![npm package size](https://badgen.net/packagephobia/install/@fractava/fractava-notes-core?style=flat-square)](https://www.npmjs.com/package/@fractava/fractava-notes-core)
[![npm](https://img.shields.io/npm/dt/@fractava/fractava-notes-core?style=flat-square)](https://www.npmjs.com/package/@fractava/fractava-notes-core)
![GitHub Lint Workflow Status](https://img.shields.io/github/workflow/status/fractava/notes-core/Lint?label=Lint&style=flat-square)
![GitHub Publish Workflow Status](https://img.shields.io/github/workflow/status/fractava/notes-core/Publish?label=Publish&style=flat-square)
![GitHub](https://img.shields.io/github/license/fractava/notes-core?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/fractava/notes-core?style=flat-square)
[![Maintenance](https://img.shields.io/maintenance/yes/2020?style=flat-square)](https://github.com/fractava/notes-core/commits/)

# FRACTAVA Notes Core

<img src="https://raw.githubusercontent.com/fractava/notes-resources/master/Notes.png" width="240">

[__Currently Work in Progress__](https://fractava.github.io/notes-docs/ideas)

The Core Libary of our Notes Apps.
It contains the Editor, but cannot run by itself.

## Screenshot

![](https://raw.githubusercontent.com/fractava/notes-core/master/img/1.png)

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
