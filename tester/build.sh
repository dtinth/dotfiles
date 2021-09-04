#!/bin/bash -e

docker rm -f dotfiles_tester_builder
docker run --name dotfiles_tester_builder -v "$(pwd)":/dotfiles -w /dotfiles dotfiles_base bash -c ./install
docker commit dotfiles_tester_builder dotfiles_tester