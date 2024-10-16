import { Chart } from "react-google-charts";

export default function GraficoPizza({ data }) {
    console.log(data);

    const receitas = data.filter((dado) => dado.tipo === "RECEITA").reduce((acumulador, valorAtual) => acumulador + valorAtual.valor, 0);
    const despesas = data.filter((dado) => dado.tipo === "DESPESA").reduce((acumulador, valorAtual) => acumulador + valorAtual.valor * -1, 0);

    const data2 = [
        ["Tipo", "Valor total"],
        ["Receitas", receitas],
        ["Depesas", despesas],
    ];

    const options = {
        title: "Relação Despesas x Receitas",
        legend: {
            alignment: 'center',
            position: 'bottom'
        },
        width: '500px',
        height: '500px',
        /*backgroundColor: {
            fill: '#f3f3f3'
        }
            */
    };

    return (
        <Chart
            chartType="PieChart"
            data={data2}
            options={options}
        />
    );
}