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
    libatomic1 \
  && rm -rf /var/lib/apt/lists/*

RUN useradd -m -s /bin/bash -G sudo devenv \
  && echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER devenv

# Add mise shims to PATH for all subsequent commands
ENV PATH="/home/devenv/.local/bin:/home/devenv/.local/share/mise/shims:$PATH"

WORKDIR /home/devenv/dotfiles
COPY --chown=devenv:devenv ./vendor/*.tar.gz ./vendor/
COPY --chown=devenv:devenv ./fish/ ./fish/
COPY --chown=devenv:devenv ./install ./install.conf.yaml ./setup_stuff ./
RUN touch ./starship.toml
RUN ./install
COPY --chown=devenv:devenv ./ ./
RUN ./install
RUN sudo usermod --shell /usr/bin/fish devenv
WORKDIR /home/devenv
CMD fish
