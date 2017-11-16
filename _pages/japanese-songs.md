---
layout: page
title: Japanese Songs
permalink: /japanese-songs/
---

{% for post in site.categories.japanese %}
  <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
  <p><small><strong>{{ post.date | date: "%B %e, %Y" }}</strong> {{ post.category }} </small></p>			
{% endfor %}
