<template>
    <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col w-full h-screen bg-slate-900">
            <!-- Page content here -->
            <!-- <label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label> -->
            <div class="flex items-center mt-8 justify-center">
                <label class="flex cursor-pointer" for="my-drawer">
                    <div class="bg-slate-800 absolute left-6 top-6 p-2 rounded-lg">
                        <Bars3Icon class="h-8 w-8 text-blue-500" />
                    </div>
                    <div class="absolute right-6 top-6 h-4 w-4">
                        <div class="bg-green-400 h-full w-full rounded-full" v-if="socketStatus" />
                        <div class="bg-red-400 h-full w-full rounded-full" v-else />
                    </div>
                </label>
                <span class="flex font-mono text-2xl text-white ml-6">Tableau de bord</span>
            </div>
            <div class="flex flex-col w-full p-4 mt-10">
                <div class="sm:w-1/4 w-full m-2 flex flex-col space-y-4">
                    <div class="flex items-center text-xl text-white gap-2">
                        <label class="swap swap-rotate">
                            <input type="checkbox" v-model="play" />
                            <PlayIcon class="h-7 w-auto text-blue-500 swap-off" />
                            <PauseIcon class="h-7 w-auto text-blue-500 swap-on" />
                        </label>
                        <span class="" v-if="!play"> Pause </span>
                        <span class="" v-else> Pause</span>
                    </div>
                </div>
                <div class="flex flex-wrap w-full my-2">
                    <lineChart :plot="plot1" class="sm:aspect-[2/1]" />
                    <!-- <barChart :plot="plot2" class="sm:aspect-[2/1]" /> -->
                    <kite :kitePos="kitePos" class="sm:aspect-[2/1]" />

                    <!-- <angleChart :plot="plot3" class="sm:aspect-[2/1]" /> -->
                </div>
            </div>
        </div>
        <div class="drawer-side">
            <label for="my-drawer" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 bg-base-100 text-base-content">
                <!-- Sidebar content here -->
                <li><a>Menu 1</a></li>
                <li><a>Menu 2</a></li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { Bars3Icon, PauseIcon, PlayIcon } from "@heroicons/vue/24/solid";
import lineChart from "../components/lineChart.vue";
import barChart from "../components/barChart.vue";
import angleChart from "../components/angleChart.vue";
import kite from "../components/kite.vue";
import ReconnectingWebSocket from "reconnecting-websocket";
import { Plot } from "../config";
import Vue from "vue";

const range = ref(20);
const play = ref(true);
const rws = new ReconnectingWebSocket("ws://localhost:1880/ws/simple");
const socketStatus = ref(false);

rws.addEventListener("open", () => {
    socketStatus.value = true;
});

rws.addEventListener("close", () => {
    socketStatus.value = false;
});

//https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
const map = (value: number, x1: number, y1: number) => ((value - x1) * 100) / (y1 - x1);

const kitePos = ref({
    theta: 0,
    phi: 0,
    psi: 0,
});

rws.addEventListener("message", (event) => {
    if (!play.value) return;
    const data = JSON.parse(event.data);
    plot1.value.series[0].data.push([data.time, data.data_line1]);
    plot1.value.series[1].data.push([data.time, data.data_line2]);
    plot2.value.series[0].data[0].y = data.data_bar1;
    plot2.value.series[0].data[1].y = data.data_line1;
    plot3.value.series[0] = map(data.data_azimuth, -90, 90);
});

const plot1 = ref<Plot>({
    labels: {
        title: "Efforts sur les lignes",
        xlabel: "Time",
        ylabel: "Force (N)",
    },
    series: [
        {
            name: "Avant",
            data: [],
        },
        {
            name: "Arrière",
            data: [],
        },
    ],
});

const plot2 = ref<Plot>({
    labels: {
        title: "Des jauges",
    },
    series: [
        {
            data: [
                {
                    x: "Un capteur",
                    y: 10,
                },
                {
                    x: "Un autre capteur",
                    y: 18,
                },
            ],
        },
    ],
});

const plot3 = ref<Plot>({
    labels: {
        title: "Azimuth",
    },
    angle: {
        max: 90,
        min: -90,
    },
    series: [0],
});
</script>
