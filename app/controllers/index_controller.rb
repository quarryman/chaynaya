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
  def section
    respond_to do |format|
      format.html {render :layout => 'inner'}
    end
  end
  def text
    respond_to do |format|
      format.html {render :layout => 'inner'}
    end
  end
  def item
    respond_to do |format|
      format.html {render :layout => 'inner'}
    end
  end
  def cart
    respond_to do |format|
      format.html {render :layout => 'inner'}
    end
  end
  def cart_delete
    respond_to do |format|
      format.json do
        render :json => {
          :status => "SUCCESS",
          :prices => {
            :regular_price => 2000,
            :discount_price => 1900,
            :total_price => 1900
          },
          :message => "Item removed successfully",
        }.to_json
      end
    end
  end
  def cart_add
    respond_to do |format|
      format.json do
        render :json => {
          :status => "SUCCESS",
          :prices => {
            :regular_price => 2130,
            :discount_price => 2100,
            :total_price => 2100
          },
          :message => "Item removed successfully",
        }.to_json
      end
    end
  end
  def news
    respond_to do |format|
      format.html {render :layout => 'inner'}

    end
  end
  def retail
    respond_to do |format|
      format.html {render :layout => 'inner'}
    end
  end
end
