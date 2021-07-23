FROM node:14.17.3-alpine
RUN apk add --update bash
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["src/auth-api/package.json", "src/auth-api/package-lock.json*", "src/auth-api/npm-shrinkwrap.json*", "./"]
COPY ./src/auth-api/ .
EXPOSE 3000
CMD /bin/bash "npm install --production --registry http://verdaccio:4873/ && mv node_modules ../ && npm start"
