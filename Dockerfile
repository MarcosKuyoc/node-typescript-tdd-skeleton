FROM node:18-alpine
# docker pull bightg30098/node-18-alpine-pnpm

WORKDIR /app

COPY src /app
COPY ./tsconfig.json /app
COPY ./package.json /app

#RUN apt-get update && apt-get install jq original-awk -y
RUN npm install pm2 -g && npm install -g yarn cross-env --force
RUN chown -R node:node /app

ENV NPM_CONFIG_LOGLEVEL warn
#ENTRYPOINT /bin/bash

USER node