function qc -d "Create a quick commit"
    # git commit -n -m (git diff --stat --staged | tail -n 1)
    git commit -n -m (printf "\u200d")
end
