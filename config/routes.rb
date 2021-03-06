Rails.application.routes.draw do
  get 'index/index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
   root 'index#index'
   get 'index/catalog' => 'index#catalog'
   get 'index/text' => 'index#text'
   get 'index/section' => 'index#section'
   get 'index/item' => 'index#item'
   get 'index/cart' => 'index#cart'
   get 'index/cart_add' => 'index#cart_add'
   get 'index/cart_delete' => 'index#cart_delete'
   get 'index/news' => 'index#news'
   get 'index/retail' => 'index#retail'
   get 'index/news_page' => 'index#news_page'
   get 'index/honor_page' => 'index#honor_page'
   get 'index/honors' => 'index#honors'
   get 'index/year_honors' => 'index#year_honors'
   get 'index/faq' => 'index#faq'
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
