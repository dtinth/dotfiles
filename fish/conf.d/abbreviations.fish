abbr --add r "npm run"

if command -v systemctl 1>/dev/null 2>&1
    abbr --add sc "sudo systemctl"
    abbr --add scu "systemctl --user"
    abbr --add jc "sudo journalctl -u"
    abbr --add jcu "journalctl --user"
end
