(function($) {


/* PRODUCT CONTAINER */

  function ProductContainer() {
    this.products = [];
  }

  ProductContainer.prototype.getProducts = function(url) {
    var self = this;
    return $.getJSON(url)
      .then(function(response) {
        return self.pushProductsToArray(response);
    })
  };

  ProductContainer.prototype.pushProductsToArray = function(productResponse) {
    for (var i = 0; i < productResponse.sales.length; i++){
      this.products.push(new Product(productResponse.sales[i], i));
    }

    return this.getProductTemplate();
  }

  ProductContainer.prototype.getProductTemplate = function() {
    var self = this;
    return $.get('product-template.html')
      .then(function(template) {
        return self.updateProductHtml(template);
      });
  };

  ProductContainer.prototype.updateProductHtml = function(template) {

    for (var i = 0; i < this.products.length; i++) {
      this.products[i].updateHtml(template);
    }

    return this.updateDom();
  };

  ProductContainer.prototype.updateDom = function() {

    thishtml = '';
    for (var i = 0; i < this.products.length; i++){
      thishtml += this.products[i].htmlview;
    }

    $("#content").append(thishtml)
    this.addRemoveProductEvent();
  };

  ProductContainer.prototype.addRemoveProductEvent = function() {
    return $('#content').on('click', '.remove-product-x', this.removeProduct);
  }

  ProductContainer.prototype.removeProduct = function(e) {
    console.log(e);
    e.preventDefault();
    var productToRemove = $(this.closest('.product-container'));
    return productToRemove.hide('slow');
  }

/* PRODUCT */

  function Product(product, i) {
    this.photo        = product.photos.medium_half
    this.title        = product.name
    this.tagline      = product.tagline
    this.url          = product.url
    this.description  = product.description
    this.htmlview     = ""
    this.index        = i
  }

  Product.prototype.updateHtml = function(template) {
    return this.htmlview = template.replace('{image}', this.photo)
                                   .replace('{title}', this.title)
                                   .replace('{tagline}', this.tagline)
                                   .replace('{url}', this.url)
                                   .replace('{description}', this.description)
  };


/* INITIATE APP */

  (function init() {
    var productContainer = new ProductContainer();
    productContainer.getProducts('data.json');
  })();

})(window.jQuery);
