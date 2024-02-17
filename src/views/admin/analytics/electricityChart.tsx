import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchBillsPerMonth } from '../../../store/reducers/chart/electricBillsPerMonthSlice';
import { VictoryChart, VictoryBar } from 'victory';

const data = [
    { quarter: 'Jan', earnings: 13000 },
    { quarter: 'Feb', earnings: 16500 },
    { quarter: 'March', earnings: 14250 },
    { quarter: 'April', earnings: 19000 },
    { quarter: 5, earnings: 13000 },
    { quarter: 6, earnings: 16500 },
    { quarter: 7, earnings: 14250 },
    { quarter: 8, earnings: 19000 },
    { quarter: 9, earnings: 19000 },
    { quarter: 10, earnings: 19000 },
    { quarter: 11, earnings: 19000 },
    { quarter: 12, earnings: 19000 }
];

const ElectricityChart = () => {
    const dispatch = useAppDispatch();
    const { billsPerMonth } = useAppSelector(state => state.electricityBill);
    console.log(billsPerMonth);


    useEffect(() => {
        dispatch(fetchBillsPerMonth());
    }, [dispatch]);



    return (
        <div >
            <h2>Electricity Chart</h2>
            <VictoryChart domainPadding={20}  >
                <VictoryBar data={data}
                    x="quarter"
                    y="earnings"
                    labels={({ datum }) => `₱${datum.earnings}`}
                    barRatio={0.9}
                    style={{
                        data: {
                            fill: "#6366F1",
                        },
                        labels: {
                            fontSize: 9
                        }
                    }}
                />
            </VictoryChart>
        </div>
    )
}

export default ElectricityChart