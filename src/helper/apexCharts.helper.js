export const mappingToChart = function(data) {
  // This function is used to map the data to the chart
  const series = [];
  const categories = [];

  data.forEach(item => {
    series.push(item.order_count);
    categories.push(item.name);
  });

  return {
    series: [{ data: series }],
    options: {
      chart: { height: 350, type: "bar" },
      plotOptions: {
        bar: { horizontal: false, columnWidth: "55%", endingShape: "rounded" },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: { categories: categories },
      fill: { opacity: 1 },
    },
  };
};
