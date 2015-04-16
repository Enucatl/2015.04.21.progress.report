(function() {
  $(function() {
    var axes, factor, file_names, height, legend, line, mythen_parser, pilatus_parser, placeholder, width;
    placeholder = "#efficiency";
    file_names = $(placeholder).data("src");
    width = $(placeholder).width();
    factor = 0.618;
    height = width * factor;
    line = new d3.chart.Line().width(width).height(height).x_scale(d3.scale.log()).y_scale(d3.scale.log()).x_value(function(d) {
      return d.exposure;
    }).y_value(function(d) {
      return d.counts;
    }).margin({
      left: 0.2 * width,
      top: 0.02 * width,
      bottom: 0.2 * width,
      right: 0.2 * width
    });
    axes = new d3.chart.Axes().x_scale(line.x_scale()).y_scale(line.y_scale()).x_title("exposure (s)").y_title("counts");
    axes.x_axis().ticks(4, d3.format(".1r"));
    axes.y_axis().ticks(4, d3.format(",d"));
    legend = new d3.chart.LineLegend().color_scale(line.color_scale()).width(width);
    pilatus_parser = function(d) {
      return {
        exposure: parseFloat(d.exposure),
        counts: parseFloat(d.counts)
      };
    };
    mythen_parser = function(d) {
      return {
        exposure: parseFloat(d.exposure),
        counts: 172 / 50 * parseFloat(d.counts)
      };
    };
    return d3.csv(file_names.mythen, mythen_parser, function(error, mythen) {
      if (error != null) {
        console.warn(error);
        return;
      }
      return d3.csv(file_names.pilatus, pilatus_parser, function(error, pilatus) {
        var cells, rows, table, table_data, tbody, thead;
        if (error != null) {
          console.warn(error);
          return;
        }
        line.x_scale().domain(d3.extent(pilatus, function(d) {
          return d.exposure;
        }));
        line.y_scale().domain([
          10, 1.1 * d3.max(pilatus, function(d) {
            return d.counts;
          })
        ]).nice();
        d3.select(placeholder).datum([
          {
            name: "mythen",
            values: mythen
          }, {
            name: "pilatus",
            values: pilatus
          }
        ]).call(line.draw);
        d3.select(placeholder).select("svg").select("g").datum(1).call(axes.draw).call(legend.draw);
        table_data = mythen.map(function(d, i) {
          return {
            exposure: d.exposure,
            mythen: d.counts.toFixed(0),
            pilatus: pilatus[i].counts.toFixed(0)
          };
        });
        table = d3.select("#efficiency-table").selectAll("table").data([table_data]);
        table.enter().append("table").classed("table", true);
        thead = table.selectAll("thead").data([1]).enter().append("thead");
        tbody = table.selectAll("tbody").data([1]).enter().append("tbody");
        thead.append("tr").selectAll("th").data(["exposure (s)", "mythen", "pilatus"]).enter().append("th").text(function(d) {
          return d;
        });
        rows = tbody.selectAll("tr").data(table_data).enter().append("tr");
        cells = rows.selectAll("td").data(function(d) {
          return ["exposure", "mythen", "pilatus"].map(function(e) {
            return {
              column: e,
              value: d[e]
            };
          });
        }).enter().append("td").html(function(d) {
          return d.value;
        });
        return table.exit().remove();
      });
    });
  });

}).call(this);
