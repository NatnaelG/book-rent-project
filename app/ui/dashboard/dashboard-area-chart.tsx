import { ApexOptions } from "apexcharts";
// import ReactApexChart from "react-apexcharts";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardAreaChart() {
    const series = [
        {
            name: "Last 6 months",
            data: [240, 140, 198, 260, 180, 240, 140, 210, 128, 260, 180, 240],
        },
        {
            name: "Same period last year",
            data: [110, 160, 188, 90, 130, 110, 160, 110, 188, 90, 130, 110],
        },
    ];

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: "area",
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#006AFF", "#656575"],
        stroke: {
            curve: "smooth",
            dashArray: [0, 5],
            colors: ["#006AFF", "#656575"],
            width: 1,
        },
        xaxis: {
            type: "category",
            categories: [
                "",
                "May",
                "",
                "Jun",
                "",
                "Jul",
                "",
                "Aug",
                "",
                "Sep",
                "",
                "Oct",
                "",
            ],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            min: 0,
            max: 300,
            tickAmount: 4,
            forceNiceScale: true,
            labels: {
                formatter: (value) => `${value}k Birr`,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        grid: {
            position: "back",
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        title: {
            text: "Earning Summary",
            align: "left",
        },
        legend: {
            show: true,
            position: "top",
            horizontalAlign: "right",
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: ["#006AFF"],
                inverseColors: true,
                opacityFrom: [0.6, 0],
                opacityTo: 0,
                stops: [0, 100, 100, 100],
            },
        },
    };

    return (
        <div id="chart">
            <Chart
                options={options as ApexOptions}
                series={series}
                type="area"
                height={350}
            />
        </div>
    );
}
