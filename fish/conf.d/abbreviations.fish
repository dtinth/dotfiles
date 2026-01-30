abbr --add ef "exec fish"
abbr --add hey "a, hey"
abbr --add hmm "a, hmm"

abbr --add r "pnpm run"
abbr --add x "pnpm exec"


abbr --add rw "gh run-watch"

abbr --add goh "git fetch && git checkout origin/HEAD"

if command -v systemctl 1>/dev/null 2>&1
    abbr --add sc "sudo systemctl"
    abbr --add scu "systemctl --user"
    abbr --add jc "sudo journalctl --unit"
    abbr --add jcu "journalctl --user --unit"
end

if command -v docker 1>/dev/null 2>&1
    abbr --add dcu "docker compose up --detach"
    abbr --add dcx "docker compose exec"
    abbr --add dcl "docker compose logs --tail=100 --follow --timestamps"
end
