class IndexController < ApplicationController
  def index
    respond_to do |format|
      format.html {render :layout => 'application'}
    end
  end
  def catalog
    respond_to do |format|
      format.html {render :layout => 'inner'}
    end
  end
  def text
    respond_to do |format|
      format.html {render :layout => 'inner'}
    end
  end
end
