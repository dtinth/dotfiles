#!/bin/bash -e

docker run --init -ti --rm -v "$(pwd)":/dotfiles -w /dotfiles dotfiles_tester "$@"