<template>
    <div class="flex items-center mt-8 justify-center">
        <span class="flex font-mono text-2xl text-white ml-6">Moniteur</span>
    </div>

    <div class="flex flex-col w-1/2 p-4 mt-10 mx-auto bg-slate-800 rounded-md">
        <div v-for="el in Object.keys(data)" class="flex gap-4">
            <div class="font-bold">{{ el }} :</div>
            <div>
                {{ data[el] }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { drawer } from "../config";
import { onMounted } from "vue";
import { data } from "../config";

onMounted(() => {
    drawer.value = false;
});
</script>
