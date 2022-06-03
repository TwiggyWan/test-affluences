FROM node:latest

WORKDIR /src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ARG listeningPort=3000
ENV PORT=$listeningPort
EXPOSE $PORT

CMD ["npm", "start"]
