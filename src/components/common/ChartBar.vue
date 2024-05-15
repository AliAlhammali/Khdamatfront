<template >
  <div>
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
export default {
  data() {
    return {
      series: [
        {
          data: [30, 40, 45, 50, 49, 60],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: ["1", "2", "3", "4", "5", "6"],
        },
        fill: {
          opacity: 1,
        },
      },
    };
  },
};
</script>
<style lang="scss">
</style>