# Linux / MacOS Setup

1. Install [Docker](https://docs.docker.com/get-docker/) and make sure the service is started.
2. Clone the `goblaq_app` repository: 

```
git clone git@github.com:goblaq/goblaq_app.git
cd goblaq_app
```

3. (Optional) Create `.env` Environment File.

Not needed for a normal `localhost` development server.

.env file:
```
HASURA_GRAPHQL_ADMIN_SECRET=somerandomsecret
GRAPHQL_SERVER=10.0.0.249
GRAPHQL_PORT=8080
```

4. Initialize Database

```
docker-compose run postgres
```

Wait for the server to initialize.  It will say _ready to accept connections._
Then enter `ctrl-C` to stop it.

5. Start services

```
docker-compose up
```

# Windows Setup

Required: Windows 10.

This is a little experimental, and will result in a set of Docker containers running within an Ubuntu
container inside of Hyper-V, controlled by Vagrant.  I think you can install Vagrant on WSL but that
sounds (maybe?) sketchy because of possibly an added virtualization layer.  Maybe someone can try
and let me know how it goes.

Another question that's not answered, is that of which to use between VirtualBox and Hyper-V.  If you're
already using VirtualBox then you'll have to stick with that.  The Vagrant Box used here has images for
both VirtualBox and Hyper-V, so both should technically be possible.

1. Install [Vagrant](https://www.vagrantup.com/downloads.html) for Windows.
2. Git should also be installed.
3. Clone this repository, and `cd` into the directory.
4. Run `vagrant up`.  This will set up Ubuntu system with Docker, and run it.
   
   > I'd be interested to hear the results of `vagrant up --provider hyperv`, to run inside of hyperv.
   > I think this will require running with admin privileges and should be fine but just not sure what that
   > will look like.
5. Run `vagrant ssh`.  This will get you an SSH session into the machine.
6. Go to the app root in your vagrant machine: `cd /app`
7. Initialize database (once): `docker-compose run postgres`.  Press `Ctrl-C` after initialized.
8. Run the app: `docker-compose up`

