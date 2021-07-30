FROM node:12.18-alpine
RUN apk add --no-cache bash
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["src/polysets-web/package.json", "src/polysets-web/package-lock.json*", "src/polysets-web/npm-shrinkwrap.json*", "./"]
COPY ./src/polysets-web . 
COPY ./scripts/docker/polysets-web/entrypoint.sh .
RUN chmod +x entrypoint.sh
# RUN npm install
# EXPOSE 3000
# # CMD /bin/bash -c "npm start"
EXPOSE 3000
CMD [ "/bin/bash", "-c", "./entrypoint.sh" ]