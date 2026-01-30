FROM debian:trixie

RUN apt-get update && apt-get install -y sudo curl python3 python3-pip
RUN useradd -m -s /bin/bash -G sudo devenv
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends tmux neovim
USER devenv

WORKDIR /home/devenv/dotfiles
COPY --chown=devenv:devenv ./vendor/*.tar.gz ./vendor/
COPY --chown=devenv:devenv ./fish/ ./fish/
COPY --chown=devenv:devenv ./install ./install.conf.yaml ./setup_stuff ./
RUN touch ./starship.toml
ENV DOTFILES_BUILDING=1
RUN ./install
ENV DOTFILES_BUILDING=
COPY --chown=devenv:devenv ./ ./
RUN ./install
RUN sudo usermod --shell /usr/bin/fish devenv
WORKDIR /home/devenv
CMD fish