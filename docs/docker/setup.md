# Development Environment



#### Install WSL2

https://docs.microsoft.com/en-us/windows/wsl/install-win10



#### Clone PolySets Repository

```bash
#In case you cannot use D:/git/ as your root directory, make sure to change it to whatever your root directory is anywhere you see a **. 
cd /mnt/d/git

git clone https://github.com/PrideVelConsulting/PolySets.git

cd PolySets
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

#### Install node and npm

```bash
#Check for a newer version on nvm.sh This one is from March 2021. 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.profile 

nvm ls-remote
#Replace version with one of the newer LTS versions from the above command. 
nvm install <version>

$ node -v
v14.16.0
$ npm -v
6.14.11
```



#### Install Docker on Window

[Docker for Windows](https://docs.docker.com/docker-for-windows/wsl/)



#### Install Docker on Linux

```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
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



##### Create htpasswd**

```bash
cd /mnt/d/git/PolySets
mkdir auth
docker run --entrypoint htpasswd httpd:2 -Bbn polysets password > auth/htpasswd
```



##### Create Private Registry Container**

```bash
docker run -d \
-p 5000:5000 \
--restart=always \
--name registry \
-v /mnt/d/git/PolySets/auth:/auth \
-e "REGISTRY_STORAGE_DELETE_ENABLED:true" \
-e "REGISTRY_AUTH=htpasswd" \
-e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
-e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \
-v /mnt/data/registry:/var/lib/registry \
-v /mnt/d/git/PolySets/scripts/docker/registry/config.yml:/etc/docker/registry/config.yml \
registry:2
```



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

```bash
docker login localhost:5000
```



#### Create Certificate**

```bash
cd /mnt/d/git/PolySets/scripts/docker/haproxy/pem

PARENT="polysets.local"
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $PARENT.key -out $PARENT.crt

#example
Country Name (2 letter code) [AU]:IN
State or Province Name (full name) [Some-State]:MH
Locality Name (eg, city) []:MUMBAI
Organization Name (eg, company) [Internet Widgits Pty Ltd]:PV
Organizational Unit Name (eg, section) []:ENG
Common Name (e.g. server FQDN or YOUR name) []:polysets.local
Email Address []:

sudo bash -c 'cat polysets.local.key polysets.local.crt >> polysets.pem'
```



#### Deploy Infra and Project containers**

```bash
cd /mnt/d/git/PolySets

sudo apt install docker-compose
./deploy.sh mongodb
./deploy.sh registry-ui
./deploy.sh verdaccio
./deploy.sh authapi
./deploy.sh webapp
```



#### Deploy Verdaccio and set it up**

```bash
cd /mnt/d/git/PolySets

./deploy.sh verdaccio
sudo chown -R 10001:65533 /mnt/data/verdaccio
```



#### Setup Haproxy**

Open portainer and verify that all infra and project containers are running.

```bash
cd /mnt/d/git/PolySets
./deploy.sh haproxy
```



#### Update hosts File

Open C:\Windows\System32\drivers\etc\hosts file in notepad++ and append following line

```bash
127.0.0.1 polysets.local
```



#### Test Setup and API

##### Register

```bash
curl --location --request POST 'https://polysets.local/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{	"username": "p1app", "password": "password"}'
```

##### Token

```bash
curl --location --request POST 'https://polysets.local/api/auth/token' \
--header 'Content-Type: application/json' \
--data-raw '{	"username": "p1app", "password": "password"}
```
