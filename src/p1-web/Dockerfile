FROM node:12.18-alpine
RUN apk add --no-cache bash
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["src/p1-web/package.json", "src/p1-web/package-lock.json*", "src/p1-web/npm-shrinkwrap.json*", "./"]
RUN npm install
COPY ./src/p1-web . 
EXPOSE 3000
CMD /bin/bash -c "npm start"