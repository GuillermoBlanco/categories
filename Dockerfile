FROM node:14

WORKDIR /categories
COPY package.json .
RUN npm install
COPY . .
CMD npm start