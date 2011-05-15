var Timeliner = Timeliner || {};

(function(Timeliner, undefined) {
  var t = Timeliner.templates = {},
      b = Timeliner.bricks;

  t.basic = function (eventObj) {
    return templ8.create(
      b.details(
        b.date(eventObj.date),
        b.title(eventObj.title),
        b.description(eventObj.description),
        b.images(eventObj.imageUrls)
      )
    );
  };

})(Timeliner, undefined);
