#!/bin/bash

git init
git add . --all
git commit -m "dokku deploy"
git remote add dokku dokku@dokku3.br4incandy.com:chest-webapp
git push --force dokku master
rm -rf .git