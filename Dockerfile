FROM debian:trixie

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get install -y --no-install-recommends \
    sudo \
    curl \
    python3 \
    python3-pip \
    tmux \
    neovim \
    git \
    fish \
  && rm -rf /var/lib/apt/lists/*

RUN useradd -m -s /bin/bash -G sudo devenv \
  && echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER devenv

WORKDIR /home/devenv/dotfiles
COPY --chown=devenv:devenv ./vendor/*.tar.gz ./vendor/
COPY --chown=devenv:devenv ./fish/ ./fish/
COPY --chown=devenv:devenv ./claude/ ./claude/
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
