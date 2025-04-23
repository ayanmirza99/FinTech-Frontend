import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { GET_TRANSACTIONS } from "@/api/apiDeclaration";
import moment from "moment";
import { useSelector } from "react-redux";

const TransactionsPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async (page = currentPage, size = pageSize) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await GET_TRANSACTIONS(page, size);
      setTransactions(response.data);
      setTotalTransactions(response.data.length);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch transactions");
      toast.error("Failed to fetch transactions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(totalTransactions / pageSize);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
  console.log(transactions);

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Transactions Overview</h1>
            <p className="text-muted-foreground mt-1">
              Have a bird eye view of all your transactions
            </p>
          </div>
        </div>
        <div className="w-full space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View your recent transactions and payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-4 border rounded"
                    >
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500 mb-4">{error}</p>
                  <Button
                    onClick={() => fetchTransactions(currentPage, pageSize)}
                  >
                    Retry
                  </Button>
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No transactions found</p>
                  <Button>Refresh</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction._id}
                      className="flex flex-col sm:flex-row justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span
                            className={`w-2 h-2 rounded-full mr-2 ${
                              transaction.sender._id === user?._id
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                          ></span>
                          <h4 className="font-medium">
                            {transaction.sender._id === user?._id
                              ? "Tranferred"
                              : "Received"}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-500">
                          {moment(transaction.createdAt).format("DD-MM-YYYY")} ·
                          ID: {transaction._id}
                        </p>
                        <p className="text-xs text-gray-400">
                          From: {transaction.sender?._id} ... To:{" "}
                          {transaction.receiver?._id}
                        </p>
                      </div>
                      <div className="text-right mt-2 sm:mt-0">
                        <p
                          className={`font-semibold ${
                            transaction.status === "completed"
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          {formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {!isLoading && !error && transactions.length > 0 && (
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Showing {transactions.length} of {totalTransactions}{" "}
                  transactions
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center md:px-2 text-sm">
                    {currentPage}/{totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPanel;
