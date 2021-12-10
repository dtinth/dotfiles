function update_dotfiles -d "Updates dotfiles from GitHub"
    sh -c "cd $DOTFILES && git pull origin master && ./install"
end
