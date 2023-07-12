class Book < ApplicationRecord
    validates :name, presence: true
    validates :gender, presence: true
    validates :age, presence: true
    validates :contact_no, presence: true
    validates :address, presence: true
end
