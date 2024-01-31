FROM node:16.20.1 as backend
WORKDIR /app

#VOLUME .:/app

COPY package.json  /app/
RUN yarn install

COPY . /app/

FROM node:16.20.1 as builder
WORKDIR /app
COPY --from=backend /app /app/
RUN yarn build

FROM node:16.20.1

WORKDIR /home/app
COPY --from=builder /app /home/app

#VOLUME ./src:/home/app/src
EXPOSE 3000

CMD ["yarn", "start:prod"]
