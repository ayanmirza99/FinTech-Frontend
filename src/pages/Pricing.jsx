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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { pricingPlans } from "@/constants";

// Static Pricing Data
// export const pricingPlans = {
//   planList: [
//     {
//       name: "Hobby",
//       price: { MONTHLY: 19, YEARLY: 190 },
//       description: "Everything in Free, plus...",
//       count: 5,
//       bots: 2,
//       credits: { MONTHLY: 2000, YEARLY: 24000 },
//       features: [
//         {
//           text: "Access to advanced models",
//           tooltip: "Get access to our most sophisticated AI models",
//         },
//         { text: "1 AI Action/chatbot" },
//         { text: "Unlimited links to train on" },
//         { text: "API access" },
//         {
//           text: "Integrations",
//           tooltip: "Connect with your favorite tools and services",
//         },
//         { text: "Basic Analytics" },
//       ],
//     },
//     {
//       name: "Standard",
//       price: { MONTHLY: 49, YEARLY: 490 },
//       description: "Everything in Hobby, plus...",
//       count: 15,
//       bots: 5,
//       credits: { MONTHLY: 10000, YEARLY: 120000 },
//       features: [
//         { text: "3 team members" },
//         { text: "2 AI Actions/chatbot" },
//         {
//           text: "Priority support",
//           tooltip: "Response within 24 hours",
//         },
//         { text: "Custom branding" },
//       ],
//     },
//     {
//       name: "Unlimited",
//       price: { MONTHLY: 99, YEARLY: 990 },
//       description: "Everything in Standard, plus...",
//       count: 50,
//       bots: 10,
//       credits: { MONTHLY: 40000, YEARLY: 480000 },
//       features: [
//         { text: "3 AI Actions/chatbot" },
//         { text: "5 team members" },
//         { text: "Remove 'Powered by Chatbase'" },
//         { text: "Use your own custom domains" },
//         { text: "Advanced Analytics" },
//         {
//           text: "24/7 support",
//           tooltip: "Response within 1 hour",
//         },
//         { text: "Dedicated account manager" },
//       ],
//     },
//   ],
// };

export function PricingPlans() {
  const { user } = useSelector((state) => state.auth);
  //   const [billingPeriod, setBillingPeriod] = useState("MONTHLY");

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
            <Card key={plan.name} className="flex flex-col w-[300px] md:min-w-[400px]">
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
                <Link to={user ? "/dashboard/billing" : "/sign-in"}>
                  <Button
                    className="w-full"
                    variant={plan.name === "Standard" ? "default" : "outline"}
                  >
                    Upgrade
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
