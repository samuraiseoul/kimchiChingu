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
        sections = Array.new
        for post in context.registers[:site].posts
            section = post.data['listing']['section']['order'] - 1
            order = post.data['listing']['order'] - 1
            if sections[section].nil?
              sections[section] = Array.new
            end
            sections[section].push post
        end
        sections.sort! {|a, b| a[0].data['listing']['section']['order'] <=> b[0].data['listing']['section']['order']}
        for section in sections
          output += "<h2>#{section[0].data['listing']['section']['order']}. #{section[0].data['listing']['section']['title']}</h2>"
        section.sort! {|a, b| a.data['listing']['order'] <=> b.data['listing']['order']}
          for post in section
            output += "<h3><a href='#{context.registers[:site].baseurl}#{post.url}'>#{post.data['listing']['order']}. #{post.data['title']}</a></h3>"
          end
        end
        "#{output}"
    end
  end
end

Liquid::Template.register_tag('listing', Jekyll::ListingTag)