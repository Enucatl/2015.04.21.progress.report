# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

set :haml, { :ugly => true }

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  #activate :minify_css

  # Minify Javascript on build
  #activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

activate :deploy do |deploy|
  deploy.method = :git
  deploy.build_before = true # default: false
  # Optional Settings
  # deploy.remote   = 'custom-remote' # remote name or git url, default: origin
  # deploy.branch   = 'custom-branch' # default: gh-pages
  # deploy.strategy = :submodule      # commit strategy: can be :force_push or :submodule, default: :force_push
  # deploy.commit_message = 'custom-message'      # commit message (can be empty), default: Automated commit at `timestamp` by middleman-deploy `version`
end

sprockets.append_path 'vendor/'

ignore "vendor/reveal.js/*.md"
ignore "vendor/reveal.js/*.html"
