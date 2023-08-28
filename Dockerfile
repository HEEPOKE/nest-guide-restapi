FROM node:18-alpine

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 6476

CMD [ "yarn", "start:dev" ]