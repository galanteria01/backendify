FROM node:14

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]