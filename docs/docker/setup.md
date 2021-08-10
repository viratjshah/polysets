# Development Environment



#### Install WSL2

https://docs.microsoft.com/en-us/windows/wsl/install-win10



#### Clone p1app Repository

```bash
cd /mnt/d/git

git clone https://github.com/PrideVelConsulting/p1app.git

cd p1app
```



#### Create Mount Folders

```bash
sudo mkdir /mnt/data

sudo mkdir /mnt/data/registry

sudo mkdir /mnt/data/portainer

sudo mkdir /mnt/data/mongodb

sudo mkdir /mnt/data/verdaccio

sudo mkdir /mnt/data/geth
```



#### Upgrade WSL to WSL2

```powershell
wsl --list --verbose

#replace distribution name with output from above command
wsl --set-version <distribution name> 2
```



#### Install Docker on Window

[Docker for Windows](https://docs.docker.com/docker-for-windows/wsl/)



#### Install Docker on Linux

```bash
sudo apt update
sudo apt install \	apt-transport-https \	ca-certificates \	curl \	gnupg \	lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \ "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \ $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt updatesudo apt install docker-ce docker-ce-cli containerd.io
sudo docker run hello-worldsudo groupadd docker

sudo usermod -aG docker $USERSetup 
```



#### Portainer

```bash
docker run -d -p 9000:9000 -p 8000:8000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v /mnt/data/portainer:/data portainer/portainer-ce

# URL
# http://localhost:9000 
```



#### Setup Private Registry



##### Create htpasswd

```bash
cd /mnt/d/git/p1app
mkdir auth
docker run \ --entrypoint htpasswd \ httpd:2 -Bbn p1app password > auth/htpasswd\
```



##### Create Private Registry Container

```bash
docker run -d \ -p 5000:5000 \ --restart=always \ --name registry \ -v /mnt/d/git/p1app/auth:/auth \ -e "REGISTRY_STORAGE_DELETE_ENABLED:true" \ -e "REGISTRY_AUTH=htpasswd" \ -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \ -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \ -v /mnt/data/registry:/var/lib/registry \ -v /mnt/d/git/p1app/scripts/docker/registry/config.yml:/etc/docker/registry/config.yml \ registry:2
```

##### 

##### Add host:port to Docker Desktop's insecure-registry

```bash
sudo nano /etc/docker/daemon.json  

#copy paste following json block in nano
#to save press ctrl+x and then enter key
{
	"insecure-registries": [ "localhost:5000" ],     
     "dns": ["10.0.0.2", "8.8.8.8"]   
}
```



##### Login Private Registry

```
docker login localhost:5000
```



#### Create Certificate

```bash
cd /mnt/d/git/p1app/scripts/docker/haproxy/pem

PARENT="p1app.local"
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $PARENT.key -out $PARENT.crt

#example
Country Name (2 letter code) [AU]:IN
State or Province Name (full name) [Some-State]:MH
Locality Name (eg, city) []:MUMBAI
Organization Name (eg, company) [Internet Widgits Pty Ltd]:PV
Organizational Unit Name (eg, section) []:ENG
Common Name (e.g. server FQDN or YOUR name) []:p1app.local
Email Address []:

sudo bash -c 'cat p1app.local.key p1app.local.crt >> p1app.pem'
```



#### Deploy Infra and Project containers

```bash
cd /mnt/d/git/p1app

sudo apt install docker-compose
./deploy.sh mongodb
./deploy.sh registry-ui
./deploy.sh verdaccio
./deploy.sh geth
./deploy.sh ganache

./deploy.sh authapi
./deploy.sh securityapi
./deploy.sh p1web
./deploy.sh p1solc
```



#### Setup Haproxy

Open portainer and verify that all infra and project containers are running.

```bash
cd /mnt/d/git/p1app
./deploy.sh haproxy
```



#### Update hosts File

Open C:\Windows\System32\drivers\etc\hosts file in notepad++ and append following line

```bash
127.0.0.1 p1app.local
```



#### Test Setup and API

##### Register

```bash
curl --location --request POST 'https://p1app.local/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{	"username": "p1app", "password": "password"}'
```

##### Token

```bash
curl --location --request POST 'https://p1app.local/api/auth/token' \
--header 'Content-Type: application/json' \
--data-raw '{	"username": "p1app", "password": "password"}
```
