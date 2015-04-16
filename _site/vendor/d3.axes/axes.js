(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  d3.chart.Axes = (function(superClass) {
    extend(Axes, superClass);

    function Axes() {
      if (this.accessors == null) {
        this.accessors = {};
      }
      this.accessors.x_axis = d3.svg.axis();
      this.accessors.y_axis = d3.svg.axis();
      this.accessors.x_title = "x";
      this.accessors.y_title = "y";
      Axes.__super__.constructor.apply(this, arguments);
    }

    Axes.prototype._draw = function(element, data, i) {
      var x_axis, x_group, x_label, x_scale, x_title, y_axis, y_group, y_label, y_scale, y_title;
      x_scale = this.x_scale();
      y_scale = this.y_scale();
      x_axis = this.x_axis();
      y_axis = this.y_axis();
      x_title = this.x_title();
      y_title = this.y_title();
      x_axis.scale(x_scale).orient("bottom");
      y_axis.scale(y_scale).orient("left");
      y_group = d3.select(element).selectAll(".y.axis").data([data]);
      y_group.enter().append("g").classed("y axis", true);
      y_group.call(y_axis);
      x_group = d3.select(element).selectAll(".x.axis").data([data]);
      x_group.enter().append("g").classed("x axis", true);
      x_group.attr("transform", "translate(0, " + (y_scale.range()[0]) + ")").call(x_axis);
      x_label = d3.select(element).select(".x.axis").selectAll("text.label").data([data]);
      x_label.enter().append("text").classed("label", true);
      x_label.attr("x", x_scale.range()[1]).attr("dy", "2.49em").style("text-anchor", "end").text(x_title);
      x_label.exit().remove();
      y_label = d3.select(element).select(".y.axis").selectAll("text.label").data([data]);
      y_label.enter().append("text").classed("label", true);
      y_label.attr("transform", "rotate(-90)").style("text-anchor", "end").attr("dy", "1em").text(y_title);
      y_label.exit().remove();
      x_group.exit().remove();
      return y_group.exit().remove();
    };

    return Axes;

  })(d3.chart.BaseChart);

}).call(this);
