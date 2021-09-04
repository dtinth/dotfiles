FROM node:16-buster

RUN apt-get update && apt-get install -y sudo && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN echo 'node ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER node
WORKDIR /dotfiles

COPY --chown=node:node tester/package.json tester/yarn.lock ./tester/
RUN cd tester && yarn install
VOLUME /dotfiles/tester/node_modules