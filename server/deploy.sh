#!/bin/bash

git init
git add . --all
git commit -m "dokku deploy"
git remote add dokku dokku@dokku4.whiteoak.dobsys.io:chest-api
git push --force dokku main
rm -rf .git 