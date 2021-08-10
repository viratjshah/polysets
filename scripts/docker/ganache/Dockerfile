FROM ubuntu:latest

ARG ACCEPT_EULA=Y
ARG DEBIAN_FRONTEND=noninteractive
ARG TZ=Asia/Kolkata

USER root

RUN apt-get update \
    && apt-get -y install curl gnupg wget software-properties-common apt-utils git-core libz3-dev \
    && curl -sL https://deb.nodesource.com/setup_14.x  | bash - \
    && apt-get -y install nodejs 

WORKDIR /app

RUN npm i -g --unsafe-perm=true --allow-root ganache-cli

EXPOSE 8545

CMD ["ganache-cli","-h","0.0.0.0"]