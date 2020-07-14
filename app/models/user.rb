class User < ApplicationRecord
    has_secure_password

    has_many :stocks
    validates :username, :password, presence: true
end
