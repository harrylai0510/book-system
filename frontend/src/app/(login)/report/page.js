'use client';

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import 'chart.js/auto';
import {Chart} from 'react-chartjs-2';
import {useEffect, useState} from "react";
import {Stack} from "@mui/material";

export default function Report(props) {
    async function getReports() {
        const rawReport = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/reports');
        const result = rawReport.ok ? await rawReport.json() : [];
        setChartData({
            mostBookBorrow: {
                labels: result.mostBookBorrow['bookNames'],
                datasets: [{label: '書名', data: result.mostBookBorrow['bookCount']}],
                options: { plugins: { title: { display: true, text: '最多人租借書本' } }, scales: { y: { ticks: { stepSize: 1 } } } }
            },
            mostUserBorrow: {
                labels: result.mostUserBorrow['userNames'],
                datasets: [{label: '使用者', data: result.mostUserBorrow['userCount']}],
                options: { plugins: { title: { display: true, text: '最多借書人' } }, scales: { y: { ticks: { stepSize: 1 } } } }
            }
        });
    }

    const [chartData, setChartData] = useState({});

    useEffect(() => {
        getReports();
    }, []);

    return (
        <Container>
            <Stack spacing={2} direction={'row'}>
                {chartData.mostBookBorrow ?
                    <Box maxWidth={'sm'} sx={{width: '100%', padding: 1, borderRadius: 1, boxShadow: 2}}>
                        <Chart type={"bar"} data={chartData.mostBookBorrow} options={chartData.mostBookBorrow.options}/>
                    </Box>
                    : ''}

                {chartData.mostUserBorrow ?
                    <Box maxWidth={'sm'} sx={{width: '100%', padding: 1, borderRadius: 1, boxShadow: 2}}>
                        <Chart type={"bar"} data={chartData.mostUserBorrow} options={chartData.mostUserBorrow.options}/>
                    </Box>
                    : ''}
            </Stack>


        </Container>
    );
}
