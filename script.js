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
    console.log('UPDATEPRODUCTHTML ran');

    for (var i = 0; i < this.products.length; i++) {
      this.products[i].updateHtml(template);
    }

    return this.updateDom();
  };

  ProductContainer.prototype.updateDom = function() {
    console.log('UPDATEDOM ran');

    thishtml = '';
    for (var i = 0; i < this.products.length; i++){
      thishtml += this.products[i].htmlview;
    }

    $("#content").append(thishtml)
  };

/* PRODUCT */

  function Product(product, i) {
    this.photo        = product.photos.medium_half
    this.title        = product.name
    this.tagline      = product.tagline
    this.url          = product.url
    this.description  = product.description
    this.htmlview     = ""
    this.index        = i
    this.custom_class = "col"+ ((i % 3) +1)
  }

  Product.prototype.updateHtml = function(template) {
    return this.htmlview = template.replace('{image}', this.photo)
                                   .replace('{title}', this.title)
                                   .replace('{tagline}', this.tagline)
                                   .replace('{url}', this.url)
                                   .replace('{description}', this.description)
                                   .replace('{custom_class}', this.custom_class);
  };


  (function init() {
    var productContainer = new ProductContainer();
    productContainer.getProducts('data.json');
  })();

})(window.jQuery);
