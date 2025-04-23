import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CANCEL_SUBSCRIPTION, GET_USERS } from "@/api/apiDeclaration";
import toast from "react-hot-toast";
import { constants } from "@/constants";
import moment from "moment";
import { useModal } from "@/hooks/useModal";

const UsersPanel = () => {
  const { setDialogData, handleModalClose } = useModal();
  const [users, setUsers] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await GET_USERS(currentPage, pageSize);
      setUsers(response.data);
      setTotalTransactions(response.pagination.total);
    } catch (err) {
      setError("Failed to fetch users");
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  const totalPages = Math.ceil(totalTransactions / pageSize);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  console.log(users);

  const handleCancelSubscription = (userId) => {
    setDialogData({
      title: "Cancel Subscription",
      description: "Are you sure you want to cancel this subscription?",
      showModal: true,
      onConfirm: async () => {
        try {
          let resp = await CANCEL_SUBSCRIPTION({ userId: userId });
          toast.success(resp.message);
          fetchUsers(currentPage, pageSize);
        } catch (error) {
          toast.error(error.message);
        } finally {
          handleModalClose();
        }
      },
    });
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              View and manage all users in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 border rounded"
                  >
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={fetchUsers}>Retry</Button>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-700 mb-4">No users found</p>
                <Button onClick={fetchUsers}>Refresh</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between mb-4">
                  <Button variant="outline" onClick={fetchUsers} size="sm">
                    Refresh
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Subscription
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => {
                        const hasSubscription =
                          user.subscription &&
                          user.subscription.status === "active";

                        return (
                          <tr key={user._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-[14px] font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-xs text-gray-700">
                                ID: {user._id.substring(0, 8)}...
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[14px] text-gray-700">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.role === "ADMIN"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[14px] text-gray-700">
                              {moment(user.createdAt).format("DD/MM/YYYY")}
                            </td>
                            {user.role !== constants.ADMIN && (
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    hasSubscription
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {hasSubscription ? "Active" : "Inactive"}
                                </span>
                              </td>
                            )}
                            <td className="
                            py-4 whitespace-nowrap text-right text-[14px] font-medium">
                              {hasSubscription &&
                                user.role !== constants.ADMIN && (
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                      handleCancelSubscription(user._id)
                                    }
                                  >
                                    Cancel Subscription
                                  </Button>
                                )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
          {!isLoading && !error && users.length > 0 && (
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                Showing {users.length} of {totalTransactions} transactions
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
  );
};

export default UsersPanel;
