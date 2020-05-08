# Developer Installation


## Windows Users Start Here

Cygwin and GitBash are both usable but can sometimes have problems. The Windows Subsystem for Linux ( WSL ) is the better option for Windows users. 
https://docs.microsoft.com/en-us/windows/wsl/install-win10

To streamline development environments, Ubuntu 18.04 LTS is recommended.


## Shell Profile

The instructions below make some changes to your shell profile.
So as not to assume which shell you use, let's set up `$PROFILE` to point to
the right place.  For most of you it will be:

```
PROFILE=~/.bashrc
```

If you don't know, please ask or else skip the steps below that change this file.

## Install NodeJS

These instructions use NVM for installing node.  Modify as needed for your favorite
way to install.

```
sudo apt-get install git xclip # If needed
# Install Node Version Manager
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

# Install NodeJS
nvm install 12.16.1


echo 'export NVM_DIR="\$HOME/.nvm"' >> $PROFILE
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "\$NVM_DIR/nvm.sh"' >> $PROFILE
echo '[ -s "$NVM_DIR/bash_completion" ] && \. "\$NVM_DIR/bash_completion"' >> $PROFILE

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

## Install Command-line Tools

```
# Install Firebase and Hasura tools
npm install -g firebase-tools hasura-cli

# Install Heroku client (Ubuntu):
sudo snap install --classic heroku
echo 'export PATH=\$PATH:/snap/bin' >> $PROFILE
export PATH=$PATH:/snap/bin

# Windows users:
curl https://cli-assets.heroku.com/install.sh | sh

# Now sign in to Heroku from the command-line
heroku login

# If you're logging in on an SSH connection and can't use a browser:
heroku login --interactive

```

Mac or other users see [Heroku](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
for installation links.


## Clone this repository

```
git clone git@github.com:goblaq/goblaq_app.git
cd goblaq_app
nvm use     # setup NVM here.
npm install

```

## Set up Development Database

[Create a heroku account](https://signup.heroku.com/) if you don’t already have one.

[Go here](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku) 
to deploy a postgres/hasura container (when prompted, I’d suggest following the app naming convention: 
goblaq-<your name> (e.g. goblaq-seth))

> I'm going to refer to your database name as $DB_NAME, so I suggest the following command to make things easier:
```
DB_NAME=goblaq-<your name>
```

Restore a backup of the production database in your newly created instance:

```
heroku pg:backups:restore --app=$DB_NAME --confirm=$DB_NAME \
    'http://157.245.165.61/latest.dump' DATABASE_URL

```

## Secure Your Database

There are several ways to handle setting up a secret key
for authenticating as an admin to your database.  This is one, fairly easy method:

```
# Select a secret key for admin access.  The following will do, on linux.
# I don't know if WSL has openssl so you might just make up your own random string instead.
# The point is to create a nice secure password.
export HASURA_GRAPHQL_ADMIN_SECRET=$(openssl rand -hex 20)

# Save it in your .bashrc to be loaded in later sessions.
echo export HASURA_GRAPHQL_ADMIN_SECRET=$HASURA_GRAPHQL_ADMIN_SECRET >> $PROFILE

# Configure your database with this admin secret.
heroku config:set \
   HASURA_GRAPHQL_ADMIN_SECRET=$HASURA_GRAPHQL_ADMIN_SECRET \
   --app=$DB_NAME

```

## Reload Database Metadata

This will reset the metadata from the restored database, to work in your new instance.

```
# Also, the following will prevent you from having to specify an endpoint
# every time you use the hasura command:

export HASURA_GRAPHQL_ENDPOINT=https://${DB_NAME}.herokuapp.com
echo export HASURA_GRAPHQL_ENDPOINT=$HASURA_GRAPHQL_ENDPOINT >> $PROFILE

# Assuming that we're currently in the root of the repository:

hasura metadata reload --project hasura-dev

```

## Verify database functionality:

First copy the access key from earlier, into your clipboard:

```
echo $HASURA_GRAPHQL_ADMIN_SECRET
```

Open the web console in your browser, at: https://$DB_NAME.herokuapp.com/console.
Paste the secret into the password field when prompted.

You should now be able to run queries against your database.

## Add DEV_DB setting to your environment file:

```
echo DEV_DB="https://${DB_NAME}.herokuapp.com/v1/graphql" >> .env
```

## Start Web Server:

```

npm run dev
```

You should now be able to access the app via browser at http://localhost:3000
