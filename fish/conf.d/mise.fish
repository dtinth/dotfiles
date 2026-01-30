# Only activate mise if it's available and we're not in Docker build
if command -v mise >/dev/null 2>&1; and test -z "$DOTFILES_BUILDING"; and test ! -f /.dockerenv
    mise activate fish | source
end