if command -v nvim 1>/dev/null 2>&1
    alias vim="nvim"
    alias vi="nvim"
end

if test -e "/Applications/Tailscale.app/Contents/MacOS/Tailscale"
    alias tailscale="/Applications/Tailscale.app/Contents/MacOS/Tailscale"
end
