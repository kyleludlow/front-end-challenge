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
    var self = this;
    productResponse.sales.map(function(product, index) {
      return self.products.push(new Product(product, index));
    });

    return self.getProductTemplate();
  }

  ProductContainer.prototype.getProductTemplate = function() {
    var self = this;
    return $.get('product-template.html')
      .then(function(template) {
        return self.updateProductHtml(template);
      });
  };

  ProductContainer.prototype.updateProductHtml = function(template) {

    this.products.map(function(product) {
      return product.updateHtml(template)
    });

    return this.updateDom();
  };

  ProductContainer.prototype.updateDom = function() {
    var thisHtml = '';

    this.products.map(function(product) {
      return thisHtml += product.htmlview
    });

    $("#content").append(thisHtml)
    this.addRemoveProductEvent();
  };

  ProductContainer.prototype.addRemoveProductEvent = function() {
    return $('#content').on('click', '.remove-product-x', this.removeProduct);
  }

  ProductContainer.prototype.removeProduct = function(e) {
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



/****************************
  ES6 (if it were usable)
****************************/

/*

($ => {


 // PRODUCT CONTAINER

  function ProductContainer() {
    this.products = [];
  }

  ProductContainer.prototype.getProducts = url => {
    let self = this;
    return $.getJSON(url)
      .then(response => self.pushProductsToArray(response));
  };

  ProductContainer.prototype.pushProductsToArray = productResponse => {

    productResponse.sales.map((product, index) => {
      return this.products.push(new Product(product, index));
    });

    return this.getProductTemplate();
  }

  ProductContainer.prototype.getProductTemplate = () => {
    let self = this;
    return $.get('product-template.html')
      .then(template => self.updateProductHtml(template));
  };

  ProductContainer.prototype.updateProductHtml = template => {

    this.products.map(product => product.updateHtml(template));

    return this.updateDom();
  };

  ProductContainer.prototype.updateDom = () => {
    let thisHtml = '';

    this.products.map(product => thisHtml += product.htmlview);

    $("#content").append(thisHtml)
    this.addRemoveProductEvent();
  };

  ProductContainer.prototype.addRemoveProductEvent = () => {
    return $('#content').on('click', '.remove-product-x', this.removeProduct);
  }

  ProductContainer.prototype.removeProduct = e => {
    e.preventDefault();
    let productToRemove = $(this.closest('.product-container'));
    return productToRemove.hide('slow');
  }

 // PRODUCT

  function Product(product, i) {
    this.photo        = product.photos.medium_half
    this.title        = product.name
    this.tagline      = product.tagline
    this.url          = product.url
    this.description  = product.description
    this.htmlview     = ""
    this.index        = i
  }

  Product.prototype.updateHtml = template => {
    return this.htmlview = template.replace('{image}', this.photo)
                                   .replace('{title}', this.title)
                                   .replace('{tagline}', this.tagline)
                                   .replace('{url}', this.url)
                                   .replace('{description}', this.description)
  };


// INITIATE APP

  (function init() {
    var productContainer = new ProductContainer();
    productContainer.getProducts('data.json');
  })();

})(window.jQuery);

*/
