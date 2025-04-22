import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { pricingPlans } from "@/constants";
import { useModal } from "@/hooks/useModal";
import { useSelector } from "react-redux";
import { SUBSCRIBE } from "@/api/apiDeclaration";
import toast from "react-hot-toast";

export function PricingPlans() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { setDialogData, handleModalClose } = useModal();
  const showConfirmModal = (name, price) => {
    setDialogData({
      title: "Subscribe",
      description: `Are you sure you want to subscribe to the ${name} plan for $${price}?`,
      showModal: true,
      onConfirm: async () => {
        const currentDate = new Date();
        const currentPeriodEnd =
          name === "Hobby"
            ? new Date(currentDate.setMonth(currentDate.getMonth() + 1))
            : new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));

        const formattedPeriodEnd = currentPeriodEnd.toISOString().split("T")[0];
        let body = {
          userId: user?._id,
          packageName: name === "Hobby" ? "monthly" : "yearly",
          currentPeriodEnd: formattedPeriodEnd,
        };
        try {
          await SUBSCRIBE(body);
          toast.success("Subscription successful!");
          navigate("/");
        } catch (error) {
          console.log(error);
          toast.error("Subscription failed!");
        }
        handleModalClose();
      },
    });
  };
  return (
    <div className="p-6 w-full md:h-[80vh] flex items-center justify-center">
      <div className="space-y-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Pricing Plans</h2>
          {/* <ToggleGroup
            type="single"
            value={billingPeriod}
            onValueChange={(value) => value && setBillingPeriod(value)}
          >
            <ToggleGroupItem value="MONTHLY" aria-label="Monthly billing">
              Monthly
            </ToggleGroupItem>
            <ToggleGroupItem value="YEARLY" aria-label="Yearly billing">
              Yearly
            </ToggleGroupItem>
          </ToggleGroup> */}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {pricingPlans.planList.map((plan) => (
            <Card
              key={plan.name}
              className="flex flex-col w-[300px] md:min-w-[400px]"
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {/* <span className="text-muted-foreground ml-2">
                    /{billingPeriod === "MONTHLY" ? "month" : "year"}
                  </span> */}
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{plan.count} characters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{plan.bots} chatbots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">
                      {plan.credits} message credits/
                      {/* {billingPeriod === "MONTHLY" ? "month" : "year"} */}
                    </span>
                  </li>
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">
                        {feature.text}
                        {feature.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 inline ml-1" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 mt-auto">
                <Button
                  className="w-full"
                  onClick={() => showConfirmModal(plan.name, plan.price)}
                  variant={plan.name === "Standard" ? "default" : "outline"}
                >
                  Subscribe
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
