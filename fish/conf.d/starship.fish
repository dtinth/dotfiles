if test -f /opt/homebrew/bin/starship
  /opt/homebrew/bin/starship init fish | source
else if type -q starship
  starship init fish | source
end
