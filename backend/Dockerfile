FROM node:22

WORKDIR /usr/src/app

COPY package*.json server.js ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]