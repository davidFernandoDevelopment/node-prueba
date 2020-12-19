FROM node:10.16.3-alpine

# LE AGREGO UN POWER-SHELL
RUN apk add bash

ADD package*.json /tmp
RUN cd/tmp && npm install
RUN mkdir /app && cp -a /tmp/node_modules /app/

WORKDIR /app
ADD . /app

RUN npm run server:build

EXPOSE 80
CMD ["npm", "run", "server"]