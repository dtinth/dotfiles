FROM node:16-buster

RUN apt-get update && apt-get install -y sudo && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN echo 'node ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER node
WORKDIR /dotfiles
