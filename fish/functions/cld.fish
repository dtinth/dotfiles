function cld -d "Create a Cloudflare Quick Tunnel"
    set -l port $argv[1]
    cloudflared tunnel --url http://127.0.0.1:$port
end
