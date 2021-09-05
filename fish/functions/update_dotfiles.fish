function update_dotfiles -d "Updates dotfiles from GitHub"
    set -l dotfiles (dirname (dirname (dirname (realpath (status --current-filename)))))
    sh -c "cd $dotfiles && git pull && ./install"
end