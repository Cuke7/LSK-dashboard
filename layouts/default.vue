<template>
    <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" v-model="drawer" />
        <div class="drawer-content flex flex-col w-full h-screen bg-slate-900">
            <label class="flex cursor-pointer" for="my-drawer">
                <div class="bg-slate-800 absolute left-6 top-6 p-2 rounded-lg">
                    <Bars3Icon class="h-8 w-8 text-blue-500" />
                </div>
                <div class="absolute right-6 top-6 h-4 w-4">
                    <div class="bg-green-400 h-full w-full rounded-full" v-if="socketStatus" />
                    <div class="bg-red-400 h-full w-full rounded-full" v-else />
                </div>
            </label>
            <slot />
        </div>
        <div class="drawer-side">
            <label for="my-drawer" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 bg-base-100 text-base-content">
                <!-- Sidebar content here -->
                <li><NuxtLink href="/">Tableau de bord</NuxtLink></li>
                <li><NuxtLink href="/moniteur">Moniteur</NuxtLink></li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Bars3Icon } from "@heroicons/vue/24/solid";
import { drawer, plot1, plot2, plot3, play, data } from "../config";

import ReconnectingWebSocket from "reconnecting-websocket";

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

rws.addEventListener("message", (event) => {
    if (!play.value) return;
    data.value = JSON.parse(event.data);
    //@ts-ignore
    plot1.value.series[0].data.push([data.value.time, data.value.data_line1]);
    //@ts-ignore
    plot1.value.series[1].data.push([data.value.time, data.value.data_line2]);
    // plot2.value.series[0].data[0].y = data.data_bar1;
    // plot2.value.series[0].data[1].y = data.data_line1;
    // plot3.value.series[0] = map(data.data_azimuth, -90, 90);
});
</script>
