| Expansion | Name |
| --------- | ---- |
| `a, hey` | `hey` |
| `a, hmm` | `hmm` |
| `docker compose exec` | `dcx` |
| `docker compose logs --tail=100 --follow --timestamps` | `dcl` |
| `docker compose up --detach` | `dcu` |
| `exec fish` | `ef` |
| `gh run-watch` | `rw` |
| `git` | `g` |
| `git add` | `ga` |
| `git add --all` | `gaa` |
| `git add --patch` | `gapa` |
| `git add --update` | `gau` |
| `git apply` | `gap` |
| `git bisect` | `gbs` |
| `git bisect bad` | `gbsb` |
| `git bisect good` | `gbsg` |
| `git bisect reset` | `gbsr` |
| `git bisect start` | `gbss` |
| `git blame -b -w` | `gbl` |
| `git branch --set-upstream-to=origin/(__git.current_branch)` | `ggsup` |
| `git branch -a -v` | `gba` |
| `git branch -a -v --no-merged` | `gban` |
| `git branch -d` | `gbd` |
| `git branch -D` | `gbD` |
| `git branch -vv` | `gb` |
| `git checkout` | `gco` |
| `git checkout -b` | `gcb` |
| `git checkout (__git.default_branch)` | `gcom` |
| `git checkout develop` | `gcod` |
| `git cherry-pick` | `gcp` |
| `git cherry-pick --abort` | `gcpa` |
| `git cherry-pick --continue` | `gcpc` |
| `git clean -dfx` | `gclean!` |
| `git clean -di` | `gclean` |
| `git clone` | `gcl` |
| `git commit --fixup` | `gcfx` |
| `git commit -a -m` | `gcam` |
| `git commit -a -v --no-verify` | `gcav` |
| `git commit -a -v --no-verify --amend` | `gcav!` |
| `git commit -m` | `gcm` |
| `git commit -S` | `gcs` |
| `git commit -S -a -m` | `gscam` |
| `git commit -v` | `gc` |
| `git commit -v --amend` | `gc!` |
| `git commit -v --no-edit --amend` | `gcn!` |
| `git commit -v --no-verify` | `gcv` |
| `git commit -v -a` | `gca` |
| `git commit -v -a --amend` | `gca!` |
| `git commit -v -a --no-edit --amend` | `gcan!` |
| `git config --list` | `gcf` |
| `git diff` | `gd` |
| `git diff --cached` | `gdca` |
| `git diff --no-ext-diff` | `gdg` |
| `git diff --stat` | `gds` |
| `git diff --stat --cached` | `gdsc` |
| `git diff --word-diff` | `gdw` |
| `git diff --word-diff --cached` | `gdwc` |
| `git diff-tree --no-commit-id --name-only -r` | `gdt` |
| `git difftool` | `gdto` |
| `git fetch` | `gf` |
| `git fetch --all --prune` | `gfa` |
| `git fetch && git checkout origin/HEAD` | `goh` |
| `git fetch origin` | `gfo` |
| `git fetch origin (__git.default_branch) --prune; and git merge FETCH_HEAD` | `gfm` |
| `git fetch origin (__git.default_branch); and git rebase FETCH_HEAD` | `grbom` |
| `git fetch origin (__git.default_branch); and git rebase FETCH_HEAD --interactive` | `grbomi` |
| `git fetch origin (__git.default_branch); and git rebase FETCH_HEAD --interactive --autosquash` | `grbomia` |
| `git log --graph` | `glgg` |
| `git log --graph --decorate --all` | `glgga` |
| `git log --oneline --decorate --color` | `glo` |
| `git log --oneline --decorate --color --graph` | `glog` |
| `git log --oneline --decorate --color --graph --all` | `gloga` |
| `git log --oneline --decorate --color (__git.default_branch)..` | `glom` |
| `git log --oneline --decorate --color develop..` | `glod` |
| `git log --pretty=format:'%C(yellow)%h %Cred%ad %Cblue%an%Cgreen%d %Creset%s' --date=short` | `gloo` |
| `git log --stat` | `glg` |
| `git merge` | `gm` |
| `git merge --abort` | `gma` |
| `git merge origin/(__git.default_branch)` | `gmom` |
| `git mergetool --no-prompt` | `gmt` |
| `git pull` | `gl` |
| `git pull --rebase` | `glr` |
| `git pull --rebase` | `gup` |
| `git pull --rebase --autostash` | `gupa` |
| `git pull --rebase --autostash -v` | `gupav` |
| `git pull --rebase -v` | `gupv` |
| `git pull --rebase origin (__git.current_branch)` | `ggu` |
| `git pull origin` | `gll` |
| `git pull origin (__git.current_branch)` | `ggl` |
| `git pull origin (__git.current_branch); and git push origin (__git.current_branch)` | `ggpnp` |
| `git push` | `gp` |
| `git push --force-with-lease` | `gp!` |
| `git push --force-with-lease origin` | `gpo!` |
| `git push --no-verify` | `gpv` |
| `git push --no-verify --force-with-lease` | `gpv!` |
| `git push origin` | `gpo` |
| `git push origin --all; and git push origin --tags` | `gpoat` |
| `git push origin (__git.current_branch)` | `ggp` |
| `git push origin (__git.current_branch) --force-with-lease` | `ggp!` |
| `git push origin (__git.current_branch) --set-upstream` | `gpu` |
| `git push origin (__git.current_branch) --set-upstream -o merge_request.create` | `gmr` |
| `git push origin (__git.current_branch) --set-upstream -o merge_request.create -o merge_request.merge_when_pipeline_succeeds` | `gmwps` |
| `git rebase` | `grb` |
| `git rebase --abort` | `grba` |
| `git rebase --continue` | `grbc` |
| `git rebase --interactive` | `grbi` |
| `git rebase --skip` | `grbs` |
| `git rebase (__git.default_branch)` | `grbm` |
| `git rebase (__git.default_branch) --interactive` | `grbmi` |
| `git rebase (__git.default_branch) --interactive --autosquash` | `grbmia` |
| `git remote -v` | `grv` |
| `git remote -vv` | `gr` |
| `git remote add` | `gra` |
| `git remote prune origin` | `grpo` |
| `git remote remove` | `grrm` |
| `git remote rename` | `grmv` |
| `git remote set-url` | `grset` |
| `git remote update` | `grup` |
| `git reset` | `grh` |
| `git reset --hard` | `grhh` |
| `git reset --hard; and git clean -dfx` | `gclean!!` |
| `git reset --patch` | `grhpa` |
| `git restore` | `grs` |
| `git restore --source` | `grss` |
| `git restore --staged` | `grst` |
| `git revert` | `grev` |
| `git rm` | `grm` |
| `git rm --cached` | `grmc` |
| `git shortlog -sn` | `gcount` |
| `git show` | `gsh` |
| `git stash` | `gsta` |
| `git stash drop` | `gstd` |
| `git stash list` | `gstl` |
| `git stash pop` | `gstp` |
| `git stash show --text` | `gsts` |
| `git status` | `gst` |
| `git status -s` | `gss` |
| `git status -sb` | `gsb` |
| `git submodule update` | `gsu` |
| `git submodule update --recursive` | `gsur` |
| `git submodule update --recursive --init` | `gsuri` |
| `git svn dcommit` | `gsd` |
| `git svn rebase` | `gsr` |
| `git switch` | `gsw` |
| `git switch --create` | `gswc` |
| `git tag -s` | `gts` |
| `git tag \| sort -V` | `gtv` |
| `git update-index --assume-unchanged` | `gignore` |
| `git update-index --no-assume-unchanged` | `gunignore` |
| `git whatchanged -p --abbrev-commit --pretty=medium` | `gwch` |
| `git worktree` | `gwt` |
| `git worktree add` | `gwta` |
| `git worktree list` | `gwtls` |
| `git worktree lock` | `gwtlo` |
| `git worktree move` | `gwtmv` |
| `git worktree prune` | `gwtpr` |
| `git worktree remove` | `gwtrm` |
| `git worktree unlock` | `gwtulo` |
| `sudo journalctl --unit` | `jc` |
| `journalctl --user --unit` | `jcu` |
| `pnpm exec` | `x` |
| `pnpm run` | `r` |
| `sudo systemctl` | `sc` |
| `systemctl --user` | `scu` |