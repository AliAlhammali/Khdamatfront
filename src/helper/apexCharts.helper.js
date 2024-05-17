export const mappingToChart = function(
  data,
  keys = ["order_count", "name"],
  lang = null,
) {
  // This function is used to map the data to the chart
  const series = [];
  const categories = [];

  data.forEach(item => {
    series.push(item[keys[0]]);

    if (typeof item[keys[1]] === "object") {
      console.log(item[keys[1]]["ar"]);
    } else {
      categories.push(item[keys[1]]);
    }
  });

  return {
    series: [{ name: "", data: series }],
    options: {
      chart: { height: 350, type: "bar", width: "100%" },
      plotOptions: {
        bar: { endingShape: "rounded", columnWidth: "55%", distributed: true },
      },
      legend: { show: true, showForSingleSeries: true, position: "top" },
      fill: {
        type: "gradient",
        gradient: { type: "vertical", inverseColors: true, stops: [0, 100] },
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val.toFixed(0);
        },
        offsetY: -20,
      },
      stroke: {
        curve: "smooth",
        show: true,
        colors: ["transparent"],
        width: 2,
      },
      xaxis: {
        categories: categories,
        labels: { show: true, rotateAlways: false, offsetY: 0 },
      },
      fill: { opacity: 1 },
    },
  };
};
