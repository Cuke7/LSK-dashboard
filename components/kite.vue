<template>
    <div class="bg-slate-800 rounded-md w-full p-4 aspect-square pb-2 flex sm:flex-1 flex-col m-2" ref="container">
        <div class="text-[18px] text-white my-3">Position du kite dans la fenêtre de vol</div>
        <div id="container" class="flex justify-center items-center"></div>
    </div>
</template>

<script lang="ts" setup>
import p5 from "p5";
import { ref, computed, onMounted } from "vue";

const props = defineProps<{
    kitePos: {
        phi: number;
        theta: number;
        psi: number;
    };
}>();

const container = ref<HTMLElement | null>(null);
const size = computed(() => {
    if (!container.value) return { width: 50, height: 50 };
    return { width: container.value.clientWidth - 50, height: container.value.clientHeight - 50 };
});

const cos = (arg: number) => {
    return Math.cos(arg);
};

const sin = (arg: number) => {
    return Math.sin(arg);
};

onMounted(() => {
    let r = (size.value.width * 0.9) / 2;
    r = Math.min(r, size.value.height * 0.9);
    var sketch = (p: p5) => {
        p.setup = () => {
            let sketch = p.createCanvas(size.value.width, size.value.height, p.WEBGL);
            sketch.style("display", "block");
            sketch.parent("container");
            p.rectMode(p.CENTER);
        };

        p.draw = () => {
            const { phi, theta, psi } = props.kitePos;
            p.clear(0, 0, 0, 0);
            // p.orbitControl();
            p.translate(0, r / 2, 0);
            // Make sure the flight window is in front of us
            p.rotateZ(p.PI / 2);
            p.rotateY(p.PI / 2);
            // Plot axes
            p.strokeWeight(2);
            p.stroke("white");
            p.line(0, 0, 0, r, 0, 0);
            p.line(0, 0, 0, 0, -r, 0);
            p.line(0, 0, 0, 0, r, 0);
            // Saving context
            p.push();
            // Move to kite frame
            p.translate(r * cos(phi) * cos(theta), r * sin(phi) * cos(theta), r * -sin(theta));
            p.rotateZ(phi);
            p.rotateY(theta - p.PI / 2);
            p.rotateZ(psi);
            // Plot the kite
            p.fill("blue");
            p.noStroke();
            p.triangle(0, r / 5, 0, -r / 5, -r / 8, 0);
            // Returning to original context
            p.pop();
            p.stroke("white");
            p.noFill();
            p.strokeWeight(0.3);
            for (let rot = 0; rot <= p.PI / 2; rot += p.PI / 20) {
                p.push();
                p.rotateY(rot);
                p.arc(0, 0, 2 * r, 2 * r, -p.PI / 2, p.PI / 2);
                p.pop();
            }
            for (let rot = 0; rot <= p.PI; rot += p.PI / 20) {
                p.push();
                p.rotateY(p.PI / 2);
                p.rotateX(rot);
                p.arc(0, 0, 2 * r, 2 * r, 0, p.PI / 2);
                p.pop();
            }
        };
    };

    new p5(sketch);
});
</script>
