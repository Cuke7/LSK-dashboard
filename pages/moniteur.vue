<template>
    <div class="flex items-center mt-8 justify-center">
        <span class="flex font-mono text-2xl text-white ml-6">Moniteur</span>
    </div>

    <div class="flex flex-col w-1/2 p-4 mt-10 mx-auto bg-slate-800 rounded-md">
        <div v-if="data">
            <div v-for="el in Object.keys(data)" class="flex justify-between border-b-2 border-slate-500 items-center my-4">
                <div class="font-bold mb-4">{{ el }}</div>
                <div class="mb-4">
                    {{ data[el] }}
                </div>
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
