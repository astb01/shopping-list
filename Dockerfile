FROM node:11.15.0-slim

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json

RUN npm install
RUN npm install react-scripts@3.0.0 -g --silent

CMD [ "npm", "start" ]