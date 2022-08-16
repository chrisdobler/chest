#!/bin/bash

git init
git add . --all
git commit -m "dokku deploy"
git remote add dokku dokku@dokku4.dobsys.io:chest-api
git push --force dokku master
rm -rf .git