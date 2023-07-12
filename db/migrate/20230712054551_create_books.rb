class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :name
      t.string :gender
      t.integer :age
      t.string :contact_no
      t.string :address

      t.timestamps
    end
  end
end
