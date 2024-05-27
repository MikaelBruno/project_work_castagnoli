import ChartDataDTO from "../models/ChartDataDTO";
export default function jsonToDatasetForBarChart(data: Record<string, Record<string, number | null>>) {

    const labelSet = new Set<string>();
    console.log(data)
    Object.values(data).forEach((innerObj) => {
        Object.keys(innerObj).forEach((key) => {
            labelSet.add(key);
        });
    });

    const labels = Array.from(labelSet).sort();

    console.log(labels);
    const datasets = Object.keys(data).map((key, index) => {
        const color = getColor(index);
        return {
            label: key,
            data: labels.map(label => data[key][label] ?? null),
            backgroundColor: color.backgroundColor,
            borderColor: color.borderColor,
            borderWidth: 1
        };
    });

    return {
        labels,
        datasets
    };
};




const getColor = (index: number) => {
    const colors = [
        { backgroundColor: 'rgba(237, 28, 36, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(238, 186, 11, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(34, 139, 34, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(153, 102, 255, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(255, 159, 64, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(199, 199, 199, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        // Aggiungi altri colori qui
    ];
    return colors[index % colors.length];
};


export{jsonToDatasetForBarChart}