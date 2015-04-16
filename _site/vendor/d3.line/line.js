(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  d3.chart.Line = (function(superClass) {
    extend(Line, superClass);

    function Line() {
      if (this.accessors == null) {
        this.accessors = {};
      }
      this.accessors.interpolation = "linear";
      this.accessors.x_value = function(d) {
        return d.x;
      };
      this.accessors.y_value = function(d) {
        return d.y;
      };
      this.accessors.color_value = function(d) {
        return d.name;
      };
      this.accessors.color_scale = d3.scale.category20();
      Line.__super__.constructor.apply(this, arguments);
    }

    Line.prototype._draw = function(element, data, i) {
      var color_names, color_scale, color_value, g, g_enter, height, interpolation, lines, margin, svg, width, x_scale, x_value, y_scale, y_value;
      width = this.width();
      height = this.height();
      margin = this.margin();
      interpolation = this.interpolation();
      x_value = this.x_value();
      y_value = this.y_value();
      x_scale = this.x_scale();
      y_scale = this.y_scale();
      color_value = this.color_value();
      color_scale = this.color_scale();
      color_names = (data.map(color_value)).filter(function(d, i, self) {
        return self.indexOf(d === i);
      });
      color_scale.domain(color_names);
      x_scale.range([0, width]);
      y_scale.range([height, 0]);
      svg = d3.select(element).selectAll("svg").data([data]);
      g_enter = svg.enter().append("svg").append("g");
      svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
      g = svg.select("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
      g.selectAll(".paths").data([data]).enter().append("g").classed("paths", true);
      lines = g.select(".paths").selectAll(".path").data(function(d) {
        return d;
      });
      lines.enter().append("path").classed("path", true);
      lines.attr("stroke", function(d) {
        return color_scale(d.name);
      }).attr("d", function(d) {
        return (d3.svg.line().interpolate(interpolation).x(function(e) {
          return x_scale(x_value(e));
        }).y(function(e) {
          return y_scale(y_value(e));
        }))(d.values);
      });
      return lines.exit().remove();
    };

    return Line;

  })(d3.chart.BaseChart);

}).call(this);
