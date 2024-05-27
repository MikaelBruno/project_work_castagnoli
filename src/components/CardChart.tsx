import "./CardChart.scss";
import React, { useEffect, useState } from "react";
import VerticalBarChart from "./VerticalBarChart";
import axios from "axios";
import BarChartDataJsonDTO from "../models/BarChartDataJsonDTO";


export default function CardChart(props: {
    readonly title: string;
    readonly text: string;
}) {
    const { title, text} = props;
    const [dataFO, setDataFO] = useState({});
    const [dataFWA, setDataFWA] = useState({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/construction-site/italy").then(response => {
            if (response.status === 200) {
                const data = response.data;
                setDataFO(data.Fiber);
                setDataFWA(data.FWA);
                setLoading(false);
                console.log(data.Fiber);
            } else {
                console.error("Errore nella chiamata AJAX:", response.status);
            }
        }).catch(error => {
            console.error("Errore nella chiamata AJAX:", error);
        });
    }, []);


    return (
        <div className="card-chart">
            <div className="card-chart-text">
                <p className="card-chart-title">{title}</p>
                <p className="card-chart-subtext">{text}</p>
            </div> 
            <div className="card-chart-chart">
                {!loading && (
                    <>
                        <VerticalBarChart jsonData={dataFO} chartTitle="Fori di opera" />
                        <VerticalBarChart jsonData={dataFWA} chartTitle="Fori di accesso" />
                    </>
                )}
                { }
            </div>
        </div> 
    );
}