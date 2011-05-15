(function (global, undefined) {

  global.templ8 = {
    _createDocFrag: function () {
      return document.createDocumentFragment();
    },

    _createElementOrAddHTML: function (html) {
      if (html === undefined) {
        return '';
      }
      return typeof html === 'string' ? html : this._createElement(html);
    },

    _createElement: function (template) {
      var element = document.createElement(template.type);

      for (var p in template.attributes) {
        var key = p;
        if (p === 'className') {
          key = 'class'
        }
        element.setAttribute(key, template.attributes[p]);
      }

      if (typeof template.html === 'object') {
        if (template.html.constructor == new Array().constructor) {
          for (var i=0, ii = template.html.length; i < ii; i++) {
            element.appendChild(this._createElement(template.html[i]));
          }
        } else {
          element.appendChild(this._createElement(template.html));
        }
      } else {
        element.innerHTML = template.html === undefined ? '' : template.html;
      }
      
      return element;
    },

    create: function (template) {
      var frag = this._createDocFrag(),
          element = this._createElement(template);
      
      frag.appendChild(element);
      return frag;
    }
  }



}(window, undefined))
