import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell, BarChart, Bar, Rectangle, XAxis } from 'recharts';
import { fetchProductsSold } from '../../../store/reducers/analytic/productsSoldSlice';
import { fetchTopStores } from '../../../store/reducers/analytic/topStoresSlice';

interface ChartCardProps {
  role: string;
}

const colorList = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#e13d3d', '#ffd06d'];
const ChartCard: React.FC<ChartCardProps> = ({ role }) => {
  const dispatch = useAppDispatch();
  const { productsSold } = useAppSelector(state => state.productsSold);
  const { topStores } = useAppSelector(state => state.topStores);

  useEffect(() => {
    if (role.toLowerCase() === "owner") {
      dispatch(fetchProductsSold());
    }

    if (role.toLowerCase() === "admin") {
      dispatch(fetchTopStores());
    }


  }, [dispatch]);



  const modifiedProductsSold: { name: string; value: number }[] = productsSold.map((entry: { label: string; value: number }) => ({
    name: entry.label,
    value: entry.value
  }));

  const modifiedTopStores: { name: string; value: number }[] = topStores.map((entry: { label: string; value: number }) => ({
    name: entry.label,
    value: entry.value
  }));


  return (
    <>
      {(role.toLowerCase() === "owner" || role.toLocaleLowerCase() === "employee") && (
        <div className="bg-white shadow-md rounded-md h-96 p-4 pb-8">
          <h2 className="text-center text-lg font-semibold">Top Products</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={modifiedProductsSold}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
              >
                {modifiedProductsSold.map((entry, index) => (
                  <Cell key={`cell-${index}-${entry}`} fill={colorList[index % colorList.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      {role.toLowerCase() === "admin" && (
        <div className="bg-white shadow-md rounded-md h-96 p-4 pb-8">
          <h2 className="text-center text-lg font-semibold">Top Performing Stores</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={400}
              height={400}
              data={modifiedTopStores}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar name="Total Products Sold" dataKey="value" fill="#6366F1" activeBar={<Rectangle fill="#83a6ed" stroke="blue" />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  )
}

export default ChartCard