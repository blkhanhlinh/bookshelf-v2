FROM node:18-alpine

WORKDIR /app/frontend

COPY package.json /app/frontend

RUN yarn install

COPY . /app/frontend

EXPOSE 3000

CMD ["yarn", "dev"]