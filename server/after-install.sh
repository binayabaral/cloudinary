[ ! -d ~/source/codedeploy ] && mkdir -p ~/source/codedeploy
# Remove the existing files in location
rm -rf ~/source/codedeploy/backend
# Copy the latest build
cp -R /source/deployments/backend ~/source/codedeploy
# Install dependencies
cd ~/source/codedeploy/backend && yarn
# Letting pm2 know the homepath otherwise codeDeploy was not able to execute the
# pm2 commands
source /home/ubuntu/.profile
PM2_HOME=/home/ubuntu/.pm2 pm2 startOrReload pm2.config.js
PM2_HOME=/home/ubuntu/.pm2 pm2 reload backend --update-env
