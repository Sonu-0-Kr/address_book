class Api::V1::BooksController < ApplicationController
  before_action :set_book, only: %i[show destroy]
  def index
    books = Book.all
    render json: books
  end

  def create
    book = Book.create!(book_params)
    if book
      render json: book
    else
      render json: book.errors
    end
  end

  def show
  end

  def destroy
    @book&.destroy
    render json: { message: 'Data deleted!' }
  end
  private

  def book_params
    params.permit(:name, :gender, :age, :contact_no, :address)
  end
  def set_book
    @book = Book.find(params[:id])
  end
end
