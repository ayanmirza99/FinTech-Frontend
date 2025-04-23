import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { GET_INVOICE_DATA } from "@/api/apiDeclaration";
import toast from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const invoiceSchema = yup.object({
  startDate: yup.string().min(1, "Start date is required"),
  endDate: yup.string().min(1, "End date is required"),
});
const InvoicePanel = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: yupResolver(invoiceSchema),
    defaultValues: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 30 days ago
      endDate: new Date().toISOString().split("T")[0], // today
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await GET_INVOICE_DATA(values.startDate, values.endDate);
      setInvoiceData(response.data);
      toast.success(response.message);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

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
              <CardTitle>Generate Invoice</CardTitle>
              <CardDescription>
                Create detailed invoices for specific date ranges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Generating..." : "Generate Invoice"}
                  </Button>
                </form>
              </Form>

              {invoiceData && (
                <div className="mt-8 border-t pt-8">
                  <h3 className="text-xl font-bold mb-4">Invoice Summary</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Period</p>
                        <p className="font-medium">
                          {formatDate(form.getValues().startDate)} -{" "}
                          {formatDate(form.getValues().endDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Invoice Date</p>
                        <p className="font-medium">
                          {formatDate(new Date().toISOString())}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Transaction Count
                        </p>
                        <p className="font-medium">{invoiceData.count}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="font-bold text-fintech-blue">
                          {formatCurrency(invoiceData.totalAmount)}
                        </p>
                      </div>
                    </div>

                    <Alert className="bg-gray-50 border">
                      <AlertTitle>Ready for Download</AlertTitle>
                      <AlertDescription>
                        Your invoice summary is ready. You can download it as a
                        PDF or view the details below.
                      </AlertDescription>
                    </Alert>

                    <div className="flex justify-start space-x-2">
                      <Button
                        onClick={() =>
                          window.open(invoiceData.downloadUrl, "_blank")
                        }
                        className="bg-primary hover:bg-primary/90"
                      >
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvoicePanel;
