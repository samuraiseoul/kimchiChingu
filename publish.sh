mv .gitignore .gitignore-local

mv .gitignore-publish .gitignore

bundle exec jekyll build

git add -A

git commit -m "publish"

git push origin :gh-pages

git subtree push --prefix _site/ origin gh-pages

mv .gitignore .gitignore-publish

mv .gitignore-local .gitignore

git reset HEAD~1

git stash
