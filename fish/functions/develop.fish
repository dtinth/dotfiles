function develop -d "Attach to a Zellij session named after the current directory or provided argument"
    set -l session_name (basename (pwd))
    zellij attach -c "$session_name"
end
