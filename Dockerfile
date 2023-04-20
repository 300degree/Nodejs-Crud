FROM node:alpine

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/

RUN npm i

COPY . /usr/src/app/
EXPOSE 8080

CMD [ "node", "Main.ts" ]