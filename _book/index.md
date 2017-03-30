---
layout: default
permalink: book/index.html
---

<div class="callout">
{% for section in site.data.sections %}
	<h2>{{ section | capitalize }}</h2>
	{% assign sorted_book = site.book | sort: "order" %}
	{% for page in sorted_book %}
		{% capture section_path %}{{page.collection}}/{{section}}/{% endcapture %}
		{% if page.path contains section_path %}
			<h3><a href='{{ site.baseurl }}{{page.url}}'>{{page.order}}. {{page.title}}</a></h3>
		{% endif %}
	{% endfor %}
{% endfor %}
</div>