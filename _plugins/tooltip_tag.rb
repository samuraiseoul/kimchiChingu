module Jekyll
  class TooltipTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @attributes = {}
      markup.scan(::Liquid::TagAttributes) do |key, value|
        @attributes[key] = value
      end
      @markup = markup
    end

    def render(context)
      "<span data-tooltip class='has-tip top japanify' title='#{@attributes['tip']}'>#{@attributes['text']}</span>
       <span class='no-japanify'>#{@attributes['text']}</span>
      "
    end
  end
end

Liquid::Template.register_tag('tooltip', Jekyll::TooltipTag)
