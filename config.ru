# frozen_string_literal: true

use Rack::Static,
    urls: ['/images', '/js', '/css'],
    root: 'public'

run lambda { |_env|
  [
    200,
    {
      'Content-Type' => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('public/index.html', File::RDONLY)
  ]
}
