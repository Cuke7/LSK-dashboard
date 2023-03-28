import { ApexOptions } from "apexcharts";
import { ref } from "vue";

// Basic time series plot
export interface Plot {
    labels: {
        title: string;
        xlabel?: string;
        ylabel?: string;
    };
    angle?: {
        min: number,
        max: number
    }
    series: ApexOptions["series"];
}

export const drawer = ref(false)
export const play = ref(true);
export const data = ref<any>()

export const kitePlot = ref({
    theta: 0,
    phi: 0,
    psi: 0,
});
export const plot1 = ref<Plot>({
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

export const plot2 = ref<Plot>({
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

export const plot3 = ref<Plot>({
    labels: {
        title: "Azimuth",
    },
    angle: {
        max: 90,
        min: -90,
    },
    series: [0],
});
