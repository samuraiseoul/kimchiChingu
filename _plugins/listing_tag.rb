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
        sections = getSections(context.registers[:site].posts)
        "#{getOutput(sections, context.registers[:site].baseurl)}"
    end

    def getSections(posts)
        sections = Array.new
        for post in posts
            #compile all posts into arrays of posts organized by section
            section = post.data['listing']['section']['order'] - 1
            order = post.data['listing']['order'] - 1
            if sections[section].nil? #create new array if that section hasn't been initialized
              sections[section] = Array.new
            end
            sections[section].push post
        end
        #sort sections, there must be a section with an order of 1 or this will fail
        sections.sort! {|a, b| a[0].data['listing']['section']['order'] <=> b[0].data['listing']['section']['order']} 
        sections
    end

    def getOutput(sections, baseUrl)
      output = ''
      for section in sections
          #Add section header for each section and sort posts in each section
          output += "<h2>#{section[0].data['listing']['section']['order']}. #{section[0].data['listing']['section']['title']}</h2>"
          section.sort! {|a, b| a.data['listing']['order'] <=> b.data['listing']['order']}

          #ouput each post link
          for post in section
            output += "<h3><a href='#{baseUrl}#{post.url}'>#{post.data['listing']['order']}. #{post.data['title']}</a></h3>"
          end
        end
        output
    end

  end
end

Liquid::Template.register_tag('listing', Jekyll::ListingTag)