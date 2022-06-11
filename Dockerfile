FROM node:18.0.0-alpine

WORKDIR /app

RUN npm i -g http-server

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build; exit 0
RUN cp dist/index.html  dist/404.html

EXPOSE 80
CMD [ "http-server", "dist", "-p", "80" ]
