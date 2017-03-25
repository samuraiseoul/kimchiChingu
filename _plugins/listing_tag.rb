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
        for post in context.registers[:site].posts
            output = output + " #{post.data['listing']['order']}"
        end
        "#{output}"
    end
  end
end

Liquid::Template.register_tag('listing', Jekyll::ListingTag)
