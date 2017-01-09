#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
if command -v yarn >/dev/null 2>&1; then
    yarn
else
    npm install
fi
gulp transpile