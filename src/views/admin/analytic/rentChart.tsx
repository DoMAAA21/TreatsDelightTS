import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchRentBillsPerMonth } from '../../../store/reducers/analytic/rentBillsPerMonthSlice';
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

const RentChart = () => {
    const dispatch = useAppDispatch();
    const { rentBillsPerMonth } = useAppSelector(state => state.rentBill);

    console.log(rentBillsPerMonth)

    useEffect(() => {
        dispatch(fetchRentBillsPerMonth());
    }, [dispatch]);

    const chartData: { month: string; totalBill: number }[] = rentBillsPerMonth.map((bill: Bill) => ({
        month: getMonthName(bill.month),
        totalBill: bill.totalBill
    }));

    return (
        <div className="w-full">
            <h2 className="text-center text-lg font-semibold mb-8">Rent Bills per Month</h2>
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
                            { value: 'Rent Bill', type: 'circle', color: '#d03232' }
                        ]}
                    />
                    <Line dataKey="totalBill" stroke="#d03232" type="monotone"activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default RentChart;
