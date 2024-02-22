import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { fetchProductsSold } from '../../../store/reducers/chart/productsSoldSlice';


const colorList = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d','#e13d3d', '#ffd06d'];
const ChartCard = () => {
  const dispatch = useAppDispatch();
  const { productsSold } = useAppSelector(state => state.productsSold);

  useEffect(() => {
    dispatch(fetchProductsSold());

  }, [dispatch])

  const modifiedData: { name: string; value: number }[] = productsSold.map((entry: { label: string; value: number }) => ({
    name: entry.label,
    value: entry.value
  }));


  return (
    <div className="bg-white shadow-md rounded-md h-96 p-4 pb-8">
      <h2 className="text-center text-lg font-semibold">Top Products</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={modifiedData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
          >
            {modifiedData.map((entry, index) => (
              <Cell key={`cell-${index}-${entry}`} fill={colorList[index % colorList.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartCard