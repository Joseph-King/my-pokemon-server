FROM node:latest

WORKDIR /my-pokemon-server
COPY ./ .

RUN npm install

EXPOSE 3000
CMD [ "node", "index.js" ]