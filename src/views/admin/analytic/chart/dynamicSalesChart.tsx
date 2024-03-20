import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { fetchDynamicSales } from '../../../../store/reducers/analytic/dynamicSalesSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Datepicker from "tailwind-datepicker-react";
import { options } from '../../../../components/DatePickerOptions';


const DynamicSalesChart = () => {
    const dispatch = useAppDispatch();
    const { sales } = useAppSelector(state => state.dynamicSales);
    const [showStartAt, setShowStartAt] = useState(false);
    const [startAt, setStartAt] = useState(new Date());
    const [showEndAt, setShowEndAt] = useState(false);
    const [endAt, setEndAt] = useState(new Date());
    const [selectedPeriod, setSelectedPeriod] = useState('daily');


    const formatStartDate = (date: Date): Date => {
        const formattedDate = new Date(date);
        formattedDate.setHours(0, 0, 0, 0);
        return formattedDate;
    };

    const formatEndDate = (date: Date): Date => {
        const formattedDate = new Date(date);
        formattedDate.setHours(23, 59, 59, 999);
        return formattedDate;
    };

    useEffect(() => {
        dispatch(fetchDynamicSales({ period: selectedPeriod, startDate: formatStartDate(startAt), endDate: formatEndDate(endAt) }));
    }, [dispatch, startAt, endAt, selectedPeriod]);


    return (
        <div className="w-full">
            <h2 className="text-center text-3xl mb-2 italic">Sales</h2>
            <div className="flex flex-wrap -mx-2 mb-5 px-2">
                <div className="w-full sm:w-1/3 px-2 mb-2 sm:mb-0">
                    <label htmlFor="period" className="block text-sm font-medium text-gray-700">
                        Select Period:
                    </label>
                    <select
                        id="period"
                        name="period"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <div className="w-full sm:w-1/3 px-2 mb-2 sm:mb-0">
                    <label htmlFor="startAt" className="block text-sm font-medium text-gray-700">
                        Start At
                    </label>
                    <Datepicker options={options} onChange={(date) => setStartAt(date)} show={showStartAt} setShow={(show) => setShowStartAt(show)} value={startAt} />
                </div>
                <div className="w-full sm:w-1/3 px-2 mb-2 sm:mb-0">
                    <label htmlFor="endAt" className="block text-sm font-medium text-gray-700">
                        End At
                    </label>
                    <Datepicker options={options} onChange={(date) => setEndAt(date)} show={showEndAt} setShow={(show) => setShowEndAt(show)} value={endAt} />
                </div>
            </div>

            <ResponsiveContainer width="100%" aspect={1.6}>
                <BarChart
                    data={sales}
                    margin={{
                        top: -10,
                        right: 50,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip
                        formatter={(value) => [`Total Sales: ₱${value}`]}
                    />
                    <Legend
                        payload={[
                            { value: 'Sales', type: 'circle', color: '#8884d8' }
                        ]}
                    />
                    <Bar dataKey="totalSales" fill="#8884d8" stroke="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DynamicSalesChart;
