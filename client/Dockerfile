FROM node:14.7.0-alpine3.12

WORKDIR /usr/src/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 80
CMD ["npm", "start"]
