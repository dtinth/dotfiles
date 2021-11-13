FROM buildpack-deps:buster
RUN apt-get update && apt-get install -y sudo tmux neovim htop ncdu build-essential

RUN useradd -rm -d /home/user -s /bin/bash -G sudo -u 1000 user
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER user

WORKDIR /dotfiles
COPY --chown=user:user ./vendor/*.tar.gz ./vendor/
COPY --chown=user:user ./fish/ ./fish/
COPY --chown=user:user ./install ./install.conf.yaml ./setup_stuff ./
RUN touch ./starship.toml
RUN ./install
COPY --chown=user:user ./ ./
RUN ./install

