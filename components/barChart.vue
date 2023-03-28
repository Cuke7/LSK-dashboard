<template>
    <div class="bg-slate-800 rounded-md w-full p-4 aspect-square pb-2 flex sm:flex-1 m-2">
        <apexchart height="100%" class="w-full" type="bar" :options="options" :series="props.plot.series"></apexchart>
    </div>
</template>

<script setup lang="ts">
import { ApexOptions } from "apexcharts";
import { Plot } from "../config";

const props = defineProps<{
    plot: Plot;
}>();

const options: ApexOptions = {
    legend: {
        fontSize: "16px",
        labels: {
            useSeriesColors: true,
        },
        itemMargin: {
            horizontal: 20,
            vertical: 10,
        },
    },
    plotOptions: {
        bar: {
            distributed: true,
        },
    },
    title: {
        text: props.plot.labels.title,
        style: {
            color: "#FFFFFF",
            fontSize: "20",
            fontFamily: "Roboto', sans-serif;",
            fontWeight: 400,
        },
    },
    xaxis: {
        title: {
            text: props.plot.labels.xlabel,
            style: {
                color: "#FFFFFF",
                fontSize: "16",
                fontFamily: "Roboto', sans-serif;",
                fontWeight: 400,
            },
        },
        labels: {
            style: {
                colors: "#858073",
                fontSize: "12px",
                fontFamily: "Roboto', sans-serif;",
            },
        },
    },
    yaxis: {
        max: 600,
        title: {
            text: props.plot.labels.ylabel,
            style: {
                color: "#FFFFFF",
                fontSize: "16px",
                fontFamily: "Roboto', sans-serif;",
                fontWeight: 400,
            },
        },
        labels: {
            style: {
                colors: "#FFFFFF",
                fontSize: "12px",
                fontFamily: "Roboto', sans-serif;",
                fontWeight: 400,
            },
        },
    },
    grid: {
        yaxis: {
            lines: {
                show: false,
            },
        },
    },
};
</script>
