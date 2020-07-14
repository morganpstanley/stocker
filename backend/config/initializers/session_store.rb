if Rails.env === 'production' 
    Rails.application.config.session_store :cookie_store, key: 'stocker-api', domain: 'stocker-react'
  else
    Rails.application.config.session_store :cookie_store, key: 'stocker-api' 
  end