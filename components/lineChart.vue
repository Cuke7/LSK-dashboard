<template>
    <div class="bg-slate-800 rounded-md w-full p-4 aspect-square pb-2 flex sm:flex-1 m-2">
        <apexchart height="100%" class="w-full" type="line" :options="options" :series="data"></apexchart>
    </div>
</template>

<script setup lang="ts">
import { ApexOptions } from "apexcharts";
import { Plot } from "../config";
import { computed } from "vue";

const props = defineProps<{
    plot: Plot;
}>();

const data = computed(() => {
    if (props.plot.series) {
        for (const serie of props.plot.series) {
            if (serie.data) {
                if (serie.data.length > 50) {
                    serie.data.shift();
                }
            }
        }
    }
    return props.plot.series;
});

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
    markers: {
        size: 0,
        colors: "#FFFFFF",
    },
    stroke: {
        width: 2,
        curve: "smooth",
    },
    tooltip: {
        enabled: false,
    },
    grid: {
        yaxis: {
            lines: {
                show: false,
            },
        },
    },
    chart: {
        animations: {
            enabled: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    title: {
        text: props.plot.labels.title,
        style: {
            color: "#FFFFFF",
            fontSize: "18",
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
        type: "datetime",
        labels: {
            style: {
                colors: "#858073",
                fontSize: "12px",
                fontFamily: "Roboto', sans-serif;",
            },
        },
    },
    yaxis: {
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
                colors: "#858073",
                fontSize: "12px",
                fontFamily: "Roboto', sans-serif;",
                fontWeight: 400,
            },
        },
    },
};
</script>
