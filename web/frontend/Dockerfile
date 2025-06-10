FROM node:18-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN mkdir -p /home/node/app/.next/cache/images

CMD npm run start -- -p 80
