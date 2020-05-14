# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "generic/ubuntu2004"
  config.vm.provision "shell",
    inline: "apt-get update && apt-get install -y \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg-agent \
      software-properties-common && \
      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - && \
      add-apt-repository \
         'deb [arch=amd64] https://download.docker.com/linux/ubuntu eoan stable' && \
      apt-get update  && \
      apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose && \
      usermod -a -G docker vagrant
  "

  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.synced_folder ".", "/app"
end
