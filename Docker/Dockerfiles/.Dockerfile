FROM node:latest

WORKDIR /my-pokemon-server
COPY ./ .

RUN npm install
CMD [ "node", "index.js" ]