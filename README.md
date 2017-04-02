# Kimchi Chingu

An open source Korean grammar guide and textbook with an eye for those who have already studied Japanese.

Front Matter Guide:

```
order: 1 # The order in the section
title:  "Page Title" # Page and article title
categories: category1 category2 # which categories it belongs to
japan-title: "文法の基本" # Title in Japanese if it has one
prevLink: 'book/section/article/' # link to next page in section (do not include on first article in a section)
nextLink: 'book/section/article/' # link to next page in section (do not include on last article in a section)
vocab: { # all korean words that appear in an article and their translations
명사: noun,
동사: verb,
형용사: adjective,
숫자: number
}
quiz: '[{ # end of article quiz
        name: "city",
        type: "input",
        answer: [
					"adjectives",
					"nouns",
					"verbs"
				],
        answers: [],
        value: "",
        values: [],
        placeholder: "",
        multiple: "",
        question: "Name one of the parts of speech."
      }]'
---
```




To compile sass:

 - cd _sass

 - bower install

 - cd ..

 - jekyll build

To add new grammar page:

 - Create new page with title, category, and order front matter

To add new grammar section:

 - create new folder in _book/ folder

 - add folder name to _data/sections.yml
