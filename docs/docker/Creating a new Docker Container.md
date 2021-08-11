# Creating a new Docker Container

This tutorial assumes you already have the development environment setup built as per setup.md and assumes you have a project folder ready.



#### Inside your project folder

Ideally this would be <path-to-root-directory>/PolySets/src/<your-project-folder>/. In here create an empty file named Dockerfile

```dockerfile
FROM node:14-alpine
RUN apk add --no-cache bash
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["src/<your-project-folder>/package.json", "src/<your-project-folder>/package-lock.json*", "src/<your-project-folder>/npm-shrinkwrap.json*", "./"]
COPY ./src/<your-project-folder>/ .
RUN npm set //verdaccio:4873/:_authToken <enter-npm-token-from-a-working-Dockerfile>
EXPOSE <outside/global-port-for-your-project> 
ENTRYPOINT ["/bin/bash", "-c", "npm install --registry http://verdaccio:4873 && cp -rf node_modules ../ && rm -rf node_modules && npm start"]

```

####  In the PolySets folder

Here you should find a pre-existing docker-compose-dev.yml and docker-compose-dev.override.yml

```yaml
#Inside docker-compose-dev.yml

services:
	<your-container-name>:
		image: localhost:5000/<your-container-name>:latest
		container_name: <your-container-name>
		build:
			context: .
			dockerfile: src/<your-project-folder>/Dockerfile
	<image-from-dockerhub>:
		image: <image-name>
		container_name: <container-name>
		restart: always
			
#Inside docker-compose-dev.override.yml
services:
	<your-container-name>:
		environment:
			-<any-env-variables-you-need>=<value>
		ports:
			-'<outside-port>':'<inside-port>' 
	<image-from-dockerhub>:
		environment:
			#if needed
			-<any-env-variables-you-need>=<value>
		ports:
			-'<outside-port>':'<default-port-for-image>' 
		volumes:
	        #if needed	
			-'<folder-on-local-machine>:<path-on-container-where-it-needs-to-be-copied>'
			-'<folder-on-local-machine>:<path-on-container-where-it-needs-to-be-copied>'
			-'<folder-on-local-machine>:<path-on-container-where-it-needs-to-be-copied>'
```

Now simply run the ./deploy.sh script present in the PolySets root directory. 

```bash
./deploy.sh <container-name>
```





#### Tips:

If you need to remove all existing files related to a container.

```bash
docker rm -f <container-name>
sudo rm -rf /mnt/data/registry/docker/registry/v2/repositories/<container-name>
sudo rm -rf /mnt/data/registry/docker/registry/v2/blobs
docker system prune
```

If ./deploy.sh doesn't seem to work for you.

```bash
#First check if docker-compose is installed, sudo apt install docker-compose. If not,

docker-compose -f docker-compose-dev.yml -f docker-compose-dev.override.yml --no-cache build <container-name>
docker-compose -f docker-compose-dev.yml -f docker-compose-dev.override.yml push <container-name>
docker rm -f <container-name>
docker-compose -f docker-compose-dev.yml -f docker-compose-dev.override.yml up -d <container-name>

#You can retireve any command you've executed using Ctrl+R in Ubuntu Terminal and typing part of the command
```

If you want to check logs from the terminal.

```bash
docker logs -f <container-name> --tail <number-of-lines>
```

