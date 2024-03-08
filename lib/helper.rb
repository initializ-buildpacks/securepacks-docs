require 'nokogiri'
require 'kramdown'

module MyHelpers
  def extract_h2_tags_from_markdown(content)
    html_content = Kramdown::Document.new(content).to_html
    doc = Nokogiri::HTML(html_content)
    doc.css('h2').map(&:text)
  end
end

include MyHelpers
