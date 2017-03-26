module Jekyll
  class ListingTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @attributes = {}
      markup.scan(::Liquid::TagAttributes) do |key, value|
        @attributes[key] = value
      end
      @markup = markup
    end

    def render(context)
        output = ''
        sections = {}
        for post in context.registers[:site].posts
            section = post.data['listing']['section']
            order = post.data['listing']['order']
            unless sections.key?(section)
              sections[section] = {}
            end
            sections[section][order] = post
        end
        sections.each do |section, posts|
          output += "<h2>#{section['order']}. #{section['title']}</h2>"
          posts.each do |order, post|
            output += "<h3><a href='#{context.registers[:site].baseurl}#{post.url}'>#{order}. #{post['title']}</a></h3>"
          end
        end
        "#{output}"
    end
  end
end

Liquid::Template.register_tag('listing', Jekyll::ListingTag)