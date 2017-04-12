mv .gitignore .gitignore-local

mv .gitignore-publish .gitignore

mv _config.yml _config-local.yml

mv _config.yml.example _config.yml

bundle exec jekyll build

git add -A

git commit -m "publish"

git push origin :gh-pages

git subtree push --prefix _site/ origin gh-pages

mv .gitignore .gitignore-publish

mv .gitignore-local .gitignore

mv _config.yml _config.yml.example

mv _config-local.yml _config.yml

git reset HEAD~1

git stash
