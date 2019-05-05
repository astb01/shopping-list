FROM node:11.15.0-slim

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock

RUN yarn install --pure-lockfile
RUN yarn global add react-scripts@3.0.0

CMD [ "npm", "start" ]