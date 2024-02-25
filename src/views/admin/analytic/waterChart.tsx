import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchWaterBillsPerMonth } from '../../../store/reducers/analytic/waterBillsPerMonthSlice';
import { LineChart,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts'; // Import ResponsiveContainer from Recharts

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

const WaterChart = () => {
    const dispatch = useAppDispatch();
    const { waterBillsPerMonth } = useAppSelector(state => state.waterBill);

    useEffect(() => {
        dispatch(fetchWaterBillsPerMonth());
    }, [dispatch]);

    const chartData: { month: string; totalBill: number }[] = waterBillsPerMonth.map((bill: Bill) => ({
        month: getMonthName(bill.month),
        totalBill: bill.totalBill
    }));

    return (
        <div className="w-full">
            <h2 className="text-center text-lg font-semibold mb-8">Water Bills per Month</h2>
            <ResponsiveContainer width="100%" aspect={2/1}>
                <LineChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
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
                            { value: 'Water Bill', type: 'circle', color: '#62b5ce' }
                        ]}
                    />
                    <Line dataKey="totalBill" stroke="#62b5ce" type="monotone"activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default WaterChart;
