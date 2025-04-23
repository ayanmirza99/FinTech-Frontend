import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
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
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckIcon } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomTextField, { LabelInputContainer } from "@/components/textField";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { TRANSFER } from "@/api/apiDeclaration";

const transferSchema = yup.object({
  sourceId: yup.string().min(1, "Source account is required"),
  destinationId: yup.string().min(1, "Destination account is required"),
  amount: yup.number().positive("Amount must be positive"),
  description: yup.string().optional(),
});

const TransferPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    resolver: yupResolver(transferSchema),
  });

  const handleReset = () => {
    form.reset(
      {
        destinationId: "",
        amount: "",
        description: "",
      },
      { keepDefaultValues: true }
    );
    setIsSuccess(false);
  };

  const onSubmit = async (body) => {
    setIsLoading(true);
    try {
      console.log("Transfer initiated", { ...body,sourceId: user?._id, });
      await TRANSFER({ ...body,sourceId: user?._id, });
      toast.success("Transfer successful!");
      handleReset();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Transfer Funds</h1>
            <p className="text-muted-foreground mt-1">
              Seamlessly transfer funds between your accounts with ease.
            </p>
          </div>
        </div>
        <div className="w-full space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Initiate Transfer</CardTitle>
              <CardDescription>
                Fill in the details below to transfer funds securely.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="flex flex-col items-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"></div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Transfer Successful
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your funds have been transferred successfully
                  </p>
                  <Button onClick={handleReset}>Make Another Transfer</Button>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <CustomTextField
                      name={"destinationId"}
                      label={"To Account"}
                      control={form.control}
                      placeholder="Select destination account"
                    />
                    <CustomTextField
                      name={"amount"}
                      label={"Amount"}
                      control={form.control}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary">
                            Description (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add a description for this transfer"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertTitle>Test Mode</AlertTitle>
                      <AlertDescription>
                        This is a test mode transfer. Use the account IDs
                        provided in the dashboard.
                      </AlertDescription>
                    </Alert>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        disabled={isLoading}
                      >
                        Reset
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Processing..." : "Transfer Funds"}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransferPanel;
