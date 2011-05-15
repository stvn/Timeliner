var Timeliner = Timeliner || {};

(function (Timeliner, undefined) {
  Timeliner.bricks = {

    date: function (timestamp) {
      return {
        type: 'p',
        attributes: {className: 'date'},
        html: new Date(timestamp).toDateString()
      }
    },
  
    title: function (title) {
       return {
        type: 'p',
        attributes: {className: 'title'},
        html: title
      } 
    },
  
    description: function (description) {
      return {
        type: 'p',
        attributes: {className: 'description'},
        html: description
      }
    },
  
    images: function (urls) {
      return {
        type: 'ul',
        attributes: {className: 'images'},
        html: function () {
          var html = [];
          for (var i=0, ii=urls.length; i<ii; i++) {
            html.push({
              type: 'li',
              attributes: {className: 'image'},
              html: {
                type: 'img',
                attributes: {src: urls[i]}
              }
            });
          }
          return html;
        }()
      }
    },
  
    details: function (templates) {
      templates = Array.prototype.slice.call(arguments);
      return {
        type: 'div',
        attributes: {className: 'details'},
        html: templates
      }
    }

  };



})(Timeliner, undefined);
