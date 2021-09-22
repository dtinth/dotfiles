function devenv -d "Run a development environment"
    set -l name $argv[1]
    set -l container_name "dev_$name"
    if not docker image inspect devenv >/dev/null 2>&1
        echo "Creating devenv image first..."
        return 1
    end
    if not docker inspect "$container_name" >/dev/null 2>&1
        docker run -d --hostname "$container_name" --name "$container_name" -v "$PWD/$name:/workspace" devenv sleep inf
        docker exec -it "$container_name" bash -c 'sudo chown user:user /workspace'
    end
    docker exec -it "$container_name" bash -c 'exec fish'
end