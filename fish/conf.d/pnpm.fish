complete \
    --command pnpm \
    --no-files \
    --condition "__fish_seen_subcommand_from exec" \
    --arguments "(find node_modules/.bin '(' -type l -or -type f ')' -exec basename '{}' ';')"

complete \
    --command pnpm \
    --no-files \
    --condition "__fish_seen_subcommand_from run" \
    --arguments "(node -p 'Object.keys(require(\\'./package.json\\').scripts || {}).join(\\'\\\\n\\')')"
