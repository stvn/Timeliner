var Timeliner = Timeliner || {};
(function (Timeliner, undefined) {
  
  if (!Timeliner.templates)   { throw new Error('Templates required.');  }

  var repository = {
    _cache: {},
    _idCounter: 0,

    get: function (uid) {
      return this._cache[uid];
    },

    add: function (value) {
      this.set(++this._idCounter, value);
      return this._idCounter;
    },

    set: function (uid, value) {
      if (this._cache[uid]) {
        throw new Error('Duplicate UID');
      }
      this._cache[uid] = value;
    },

    destroy: function (uid) {
      delete this._cache[uid];
    },

    flush: function () {
      this._cache = {};
    }
  };

  var Segment = function (timelineEvent) {
    var self          = this;
    this.uid          = null;
    this.domNode      = null;
    this.detailsNode  = null;

    (function init(){
      try {
        var template = Timeliner.templates[timelineEvent.type](timelineEvent);
      } catch (e) {
        throw Error('Missing Template: ' + timelineEvent.type);
      }

      self.uid          = repository.add(self);
      self.domNode      = document.createElement('li');
      self.domNode.setAttribute('id', 'segment-' + timelineEvent.date);
      self.domNode.setAttribute('class', 'timeline-segment');
      self.detailsNode  = template.firstChild;
      self.domNode.appendChild(template);
    }());
  };
 
  function addClassName(node, className) {
    node.className += ('' + className);
  }

  function removeClassName(node, className) {
    node.className = node.className.replace(className,'');
  }

  Timeline = function (events, parentNode) {
    var self        = this;
    this.uid        = null;
    this.domNode    = null;
    this.parentNode = null;
    this.events     = [];
    this.currentView = 'list-view'

    this.load = function () {
      this.parentNode.appendChild(this.domNode);
    };

    this.hide = function () {
      this.domNode.style.display = 'none';  
    };

    this.show = function () {
      this.domNode.style.display = '';  
    };

    this.toggleView = function () {
      var toRemove, toAdd;
      if (this.currentView == 'list-view') {
        toRemove = 'list-view';
        toAdd = 'timeline-view';
      } else {
        toRemove = 'timeline-view';
        toAdd = 'list-view';
      }
      this.currentView = toAdd;
      removeClassName(this.domNode, toRemove);
      addClassName(this.domNode, toAdd);
    };

    function createEvent(eventObj) {
      var segment = new Segment(eventObj);
      self.domNode.appendChild(segment.domNode);
      self.events.push(segment);
    }

    function createEvents() {
      for (var i=0, ii=events.length; i<ii; i++) {
        createEvent(events[i]);
      }
    }

    (function init(){
      if (typeof events !== 'object') {
        throw new Error('Argument provided is not of type object');
      }
      
      self.uid        = repository.add(self);
      self.domNode    = document.createElement('ul');
      self.parentNode = parentNode || document.body;
      createEvents();
    }());
  };

  Timeliner.create = function (events, parentNode) {
    return new Timeline(events, parentNode);
  };
}(Timeliner, undefined));
