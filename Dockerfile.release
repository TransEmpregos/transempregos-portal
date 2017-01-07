FROM node:7
MAINTAINER Giovanni Bassi <giggio@giggio.net>
RUN mkdir /app
WORKDIR /app
EXPOSE 3000
CMD npm start
COPY package.json /app/package.json
RUN npm install --production
COPY . /app