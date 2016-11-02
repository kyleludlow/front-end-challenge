(function($) {


/* PRODUCT CONTAINER */

  function ProductContainer() {
    this.products = [];
  }

  // Fetches JSON data
  ProductContainer.prototype.getProducts = function(url) {
    var self = this;
    return $.getJSON(url)
      .then(function(response) {
        return self._pushProductsToArray(response);
    })
  };

  // Maps required JSON product info to products array
  ProductContainer.prototype._pushProductsToArray = function(productResponse) {
    var self = this;
    productResponse.sales.map(function(product, index) {
      return self.products.push(new Product(product, index));
    });

    return self._getProductTemplate();
  }

  // Fetches the product HTML template for updating
  ProductContainer.prototype._getProductTemplate = function() {
    var self = this;
    return $.get('product-template.html')
      .then(function(template) {
        return self._updateProductHtml(template);
      });
  };

  // Updates product HTML template with individual product data
  ProductContainer.prototype._updateProductHtml = function(template) {

    this.products.map(function(product) {
      return product.updateHtml(template)
    });

    return this._updateDom();
  };

  // concatenates all HTML from products
  // removes loading image
  // appends the HTML to the content container
  // adds event listener for removal of products
  ProductContainer.prototype._updateDom = function() {
    var thisHtml = '';

    this.products.map(function(product) {
      return thisHtml += product.htmlview
    });

    $(".loading").remove();
    $("#content").append(thisHtml)
    this._addRemoveProductEvent();
  };

  // adds on-click event listener
  ProductContainer.prototype._addRemoveProductEvent = function() {
    return $('#content').on('click', '.remove-product-x', this.removeProduct);
  }

  // hides product container from the DOM on click
  ProductContainer.prototype._removeProduct = function(e) {
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

  // provides individual product data for HTML template
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
