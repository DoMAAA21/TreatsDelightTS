import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { fetchSalesPerMonth } from '../../../../store/reducers/analytic/timelySalesSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'; 

interface Sale {
    month: number;
    totalSales: number;
}

const getMonthName = (monthNumber: number) => {
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

const SalesPerDayChart = () => {
    const dispatch = useAppDispatch();
    const { salesPerMonth } = useAppSelector(state => state.timelySales);

    useEffect(() => {
        dispatch(fetchSalesPerMonth());
    }, [dispatch]);

    const chartData: { month: string; totalSales: number }[] = salesPerMonth.map((sale: Sale) => ({
        month: getMonthName(sale.month),
        totalSales: sale.totalSales
    }));

    

    return (
        <div className="w-full">
            <h2 className="text-center text-lg mb-4 italic">Monthly Sales</h2>
            <ResponsiveContainer width="110%" aspect={1.6}>
                <BarChart
                    data={chartData}
                    margin={{
                        top: -10,
                        right: 50,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                        formatter={(value) => [`Total Sales: ₱${value}`]}
                    />
                    <Legend
                        payload={[
                            { value: 'Monthly Sales', type: 'circle', color: '#68d391' }
                        ]}
                    />
                    <Bar dataKey="totalSales" fill="#68d391" stroke="#68d391"  />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SalesPerDayChart;
