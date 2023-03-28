<template>
    <div class="bg-slate-800 rounded-md w-full p-4 aspect-square pb-2 flex sm:flex-1">
        <apexchart height="100%" class="w-full" type="radialBar" :options="options" :series="props.plot.series"></apexchart>
    </div>
</template>

<script setup lang="ts">
import { ApexOptions } from "apexcharts";
import { Plot } from "../config";

const props = defineProps<{
    plot: Plot;
}>();

const options: ApexOptions = {
    title: {
        text: props.plot.labels.title,
        style: {
            color: "#FFFFFF",
            fontSize: "20",
            fontFamily: "Roboto', sans-serif;",
            fontWeight: 400,
        },
    },
    chart: {
        animations: {
            enabled: false,
            speed: 100,
        },
    },
    plotOptions: {
        radialBar: {
            startAngle: props.plot.angle?.min,
            endAngle: props.plot.angle?.max,
            track: {
                background: "#333",
                startAngle: props.plot.angle?.min,
                endAngle: props.plot.angle?.max,
            },
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    color: "#FFFFFF",
                    fontSize: "30px",
                    show: true,
                    formatter: function (val: any) {
                        // @ts-ignore: Unreachable code error
                        const total = props.plot.angle?.max - props.plot.angle?.min;
                        return Math.round((val * total) / 100) + "°";
                    },
                },
            },
        },
    },
};
</script>
