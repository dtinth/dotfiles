if test -f /opt/homebrew/bin/starship
  /opt/homebrew/bin/starship init fish | source
else
  starship init fish | source
end
