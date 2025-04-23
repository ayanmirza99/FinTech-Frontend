import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { GET_TRANSACTIONS_TREND } from "@/api/apiDeclaration";

const TransactionTrendChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await GET_TRANSACTIONS_TREND();
        setData(res.data);
      } catch (err) {
        console.error("Error fetching trends:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">Transactions (Last 7 Days)</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6366f1"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TransactionTrendChart;
