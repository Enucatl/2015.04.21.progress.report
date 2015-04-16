(function() {
  $(function() {
    var draw_visibility;
    draw_visibility = function(placeholder) {
      var axes, factor, file_name, height, line, width;
      file_name = $(placeholder).data("src");
      width = $(placeholder).width();
      factor = 0.618;
      height = width * factor;
      line = new d3.chart.Line().width(width).height(height).x_value(function(d) {
        return d.pixel;
      }).y_value(function(d) {
        return d.visibility;
      }).margin({
        left: 100,
        top: 20,
        bottom: 100,
        right: 100
      });
      axes = new d3.chart.Axes().x_scale(line.x_scale()).y_scale(line.y_scale()).x_title("pixel").y_title("visibility");
      axes.x_axis().ticks(4);
      axes.y_axis().ticks(4);
      return d3.csv(file_name, function(d) {
        return {
          pixel: parseInt(d.pixel),
          visibility: parseFloat(d.visibility)
        };
      }, function(error, data) {
        if (error != null) {
          console.warn(error);
          return;
        }
        line.x_scale().domain(d3.extent(data, function(d) {
          return d.pixel;
        }));
        line.y_scale().domain([0, 0.1]);
        d3.select(placeholder).datum([
          {
            name: "visibility",
            values: data
          }
        ]).call(line.draw);
        return d3.select(placeholder).select("svg").select("g").datum(1).call(axes.draw);
      });
    };
    draw_visibility("#mythen-visibility");
    return draw_visibility("#pilatus-visibility");
  });

}).call(this);
