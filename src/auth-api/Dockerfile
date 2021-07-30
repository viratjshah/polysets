FROM node:14-alpine
RUN apk add --no-cache bash
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["src/auth-api/package.json", "src/auth-api/package-lock.json*", "src/auth-api/npm-shrinkwrap.json*", "./"]
COPY ./src/auth-api/ .
RUN npm set //verdaccio:4873/:_authToken "g7JwbbhC0dnE3vkbzZnGwIJcoTHmHA1x5UNdAC8y7hk="
EXPOSE 3000
ENTRYPOINT ["/bin/bash", "-c", "npm install --registry http://verdaccio:4873 && mv node_modules ../ && npm start"]