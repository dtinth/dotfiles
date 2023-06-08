# fish shell
function otmp -d "Create and open a temporary directory"
    set --local name (node -p 'new Date().toJSON().replace(/\W/g,"")')
    set --local dir "/tmp/$name"
    echo $dir
    mkdir -p $dir

    # open in finder (if on mac)
    if command -v open 1>/dev/null 2>&1
        open $dir
    end
end
