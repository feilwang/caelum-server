#!/usr/bin/env bash

cd /root/caelum/caelum-server/
echo 'step1 update code'
echo '============================'
git pull

echo 'step2 install node modules'
echo '============================'
npm install

echo 'step3 stop node server'
echo '============================'
forever stop bin/www

echo 'step4 start node server'
echo '============================'
forever start -l caelum-server.log -a bin/www

