source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby File.read('.ruby-version').strip

gem 'rails', '~> 7.2.2', '>= 7.2.2.1'
gem 'sprockets-rails' # The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem 'puma', '>= 5.0' # Use the Puma web server [https://github.com/puma/puma]
gem 'turbo-rails' # Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem 'stimulus-rails' # Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem 'jbuilder' # Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem 'uglifier', '~> 4.2'
gem 'light-service'
gem 'pg', '~> 1.5'
gem 'tailwindcss-rails', '~> 4.2.1'
gem 'toastr-rails', '~> 1.0'
gem 'font-awesome-sass'
gem 'httparty', '~> 0.22.0'
gem 'dotenv-rails', '~> 3.1'
gem 'pagy', '~> 9.3'
gem 'jsbundling-rails', '~> 1.3'
gem 'importmap-rails', '~> 2.1'
gem 'aws-sdk-s3'
# Use Redis adapter to run Action Cable in production
# gem "redis", ">= 4.0.1"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[ windows jruby ]

gem 'bootsnap', require: false # Reduces boot times through caching; required in config/boot.rb

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

group :development, :test do
  gem 'debug', platforms: %i[ mri windows ], require: 'debug/prelude'
  gem 'brakeman', require: false # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem 'rubocop-rails-omakase', require: false # Omakase Ruby styling [https://github.com/rails/rubocop-rails-omakase/]
  gem 'factory_bot', '~> 6.5'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'pry'
  gem 'rspec-rails', '~> 7.1.1'
  gem 'shoulda-matchers'
end

group :development do
  gem 'annotate', '~> 3.2.0'
  gem 'listen', '~> 3.2' # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'rubocop'
  gem 'spring' # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring-watcher-listen'
  gem 'web-console'
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'webmock', '~> 3.25'
end
