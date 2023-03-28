import { ApexOptions } from "apexcharts";

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
