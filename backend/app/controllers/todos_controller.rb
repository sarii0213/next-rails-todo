class TodosController < ApplicationController
  def index
    @todos = Todo.all.order(created_at: :desc).limit(10)

    render json: @todos
  end
end
