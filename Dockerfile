FROM buildpack-deps:buster

RUN apt-get update && apt-get install -y sudo && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN useradd -rm -d /home/tester -s /bin/bash -G sudo -u 1000 tester
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER tester

WORKDIR /dotfiles
COPY --chown=tester:tester ./ ./
RUN ./install