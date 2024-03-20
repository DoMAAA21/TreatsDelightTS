import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { fetchElectricityBillsPerMonth } from '../../../../store/reducers/analytic/electricBillsPerMonthSlice';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'; 
import { curveCardinal } from 'd3-shape';

interface Bill {
    month: number;
    totalBill: number;
    year: number;
}

function getMonthName(monthNumber: number) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    if (monthNumber >= 1 && monthNumber <= 12) {
        return months[monthNumber - 1];
    } else {
        return "Invalid Month";
    }
}

const cardinal = curveCardinal.tension(0.2);

const ElectricityChart = () => {
    const dispatch = useAppDispatch();
    const { electricBillsPerMonth } = useAppSelector(state => state.electricityBill);

    useEffect(() => {
        dispatch(fetchElectricityBillsPerMonth());
    }, [dispatch]);

    const chartData: { month: string; totalBill: number }[] = electricBillsPerMonth.map((bill: Bill) => ({
        month: getMonthName(bill.month),
        totalBill: bill.totalBill
    }));

    return (
        <div className="w-full">
            <h2 className="text-center text-lg mb-4 italic">Electricity Bills per Month</h2>
            <ResponsiveContainer width="100%" aspect={1.6}>
                <AreaChart
                    data={chartData}
                    margin={{
                        top: 0,
                        right: 15,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                        formatter={(value) => [`Total Bill: ₱${value}`]}
                    />
                    <Legend
                        payload={[
                            { value: 'Electricity Bill', type: 'circle', color: '#d1bf00' }
                        ]}
                    />
                    <Area type={cardinal} dataKey="totalBill" stroke="#d1bf00" fill="#d1bf00" fillOpacity={0.3} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ElectricityChart;
