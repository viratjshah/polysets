FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["src/polysets-web/package.json", "src/polysets-web/package-lock.json*", "src/polysets-web/npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY ./src/polysets-web/ .
EXPOSE 3000
CMD ["npm", "start"]
