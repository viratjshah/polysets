FROM node:14-alpine
RUN apk add --no-cache bash
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["src/auth-api/package.json", "src/auth-api/package-lock.json*", "src/auth-api/npm-shrinkwrap.json*", "./"]
COPY ./src/auth-api/ .
COPY ./scripts/docker/auth-api/entrypoint.sh .
RUN chmod +x entrypoint.sh
EXPOSE 3000
CMD [ "/bin/bash", "-c", "./entrypoint.sh" ]
