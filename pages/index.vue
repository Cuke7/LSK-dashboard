<template>
    <div class="flex items-center mt-8 justify-center">
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
            <kite :kitePos="kitePlot" class="sm:aspect-[2/1]" />
        </div>
        <!-- <div class="flex flex-wrap w-full my-2">
            <barChart :plot="plot2" class="sm:aspect-[2/1]" />
            <angleChart :plot="plot3" class="sm:aspect-[2/1]" />
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { PauseIcon, PlayIcon } from "@heroicons/vue/24/solid";
import lineChart from "../components/lineChart.vue";
import barChart from "../components/barChart.vue";
import angleChart from "../components/angleChart.vue";
import kite from "../components/kite.vue";
import { drawer, play, plot1, plot2, plot3, kitePlot } from "../config";

// Close drawer after navigating to page
onMounted(() => {
    drawer.value = false;
});
</script>
