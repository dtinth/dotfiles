abbr --add r "npm run"
abbr --add ya "yarn add"
abbr --add yad "yarn add --dev"

if command -v systemctl 1>/dev/null 2>&1
    abbr --add sc "sudo systemctl"
    abbr --add scu "systemctl --user"
    abbr --add jc "sudo journalctl --unit"
    abbr --add jcu "journalctl --user"
end

if command -v docker-compose 1>/dev/null 2>&1
    abbr --add dcu "docker-compose up --detach"
    abbr --add dcl "docker-compose logs --tail=100 --follow --timestamps"
end
