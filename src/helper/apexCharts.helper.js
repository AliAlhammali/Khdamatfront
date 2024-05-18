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
    if (typeof item.name === "object") {
      categories.push(item.name[lang]);
    } else {
      categories.push(item[keys[1]]);
    }
  });

  return {
    series: [{ name: "", data: series }],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      stroke: { width: 1, colors: ["#fff"] },
      xaxis: { categories: categories, labels: { show: false } },
      legend: { position: "top" },
      plotOptions: {
        bar: {
          endingShape: "rounded",
          columnWidth: "55%",
          distributed: true,
        },
      },
    },
  }; // 'around', 'end' // 'all', 'last'
};
