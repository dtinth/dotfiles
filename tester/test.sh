#!/bin/bash -e

docker run --init -ti --rm -v "$(pwd)":/dotfiles -w /dotfiles dotfiles_tester node tester/run-test.js "$@"