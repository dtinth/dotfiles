FROM mcr.microsoft.com/vscode/devcontainers/base:bullseye

RUN usermod --login devenv --move-home --home /home/devenv --append --groups sudo vscode && groupmod --new-name devenv vscode
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER devenv

WORKDIR /home/devenv/dotfiles
COPY --chown=devenv:devenv ./vendor/*.tar.gz ./vendor/
COPY --chown=devenv:devenv ./fish/ ./fish/
COPY --chown=devenv:devenv ./install ./install.conf.yaml ./setup_stuff ./
RUN touch ./starship.toml
RUN ./install
COPY --chown=devenv:devenv ./ ./
RUN ./install

WORKDIR /home/devenv