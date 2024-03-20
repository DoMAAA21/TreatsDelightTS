import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { fetchSalesPerDay } from '../../../../store/reducers/analytic/timelySalesSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'; 


const SalesPerDayChart = () => {
    const dispatch = useAppDispatch();
    const { salesPerDay } = useAppSelector(state => state.timelySales);

    useEffect(() => {
        dispatch(fetchSalesPerDay());
    }, [dispatch]);

 
    return (
        <div className="w-full">
            <h2 className="text-center text-lg font-semibold mb-8">Sales Per Day</h2>
            <ResponsiveContainer width="110%" aspect={2/1}>
                <BarChart
                    data={salesPerDay}
                    margin={{
                        top: -10,
                        right: 50,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="dayOfWeek" />
                    <YAxis />
                    <Tooltip
                        formatter={(value) => [`Total Bill: ₱${value}`]}
                    />
                    <Legend
                        payload={[
                            { value: 'SalesPerDay Bill', type: 'circle', color: '#d1bf00' }
                        ]}
                    />
                    <Bar dataKey="totalSales" fill="#8884d8" stroke="#d1bf00"  />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SalesPerDayChart;
