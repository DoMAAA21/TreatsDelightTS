import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryPie } from 'victory';

const ChartCard = () => {
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];

  return (
    <div className="bg-white shadow-md rounded-md h-96 p-4">
      <h2>Projected Sales</h2>
      {/* <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart> */}
      <VictoryPie
        // data={[
        //   { x: "Cats", y: 35 },
        //   { x: "Dogs", y: 40 },
        //   { x: "Birds", y: 55 }
        // ]}
        data={data}
        x="quarter" y="earnings"
        colorScale={["#bfe0e2", "#5faab1", "#356169", "#d9aeff", "#9825f8" ]}

      />
    </div>
  )
}

export default ChartCard