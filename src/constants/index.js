export const constants = {
  authToken: "token",
};

export const USER_ROLES = [
  //   { value: "", label: "Choose Role" },
  { value: "DEVELOPER", label: "Developer" },
  { value: "ADMIN", label: "Admin" },
];

export const pricingPlans = {
  planList: [
    {
      name: "Hobby",
      price: 19,
      description: "Everything in Free, plus...",
      count: 5,
      bots: 2,
      credits: 2000,
      features: [
        {
          text: "Access to advanced models",
          tooltip: "Get access to our most sophisticated AI models",
        },
        { text: "1 AI Action/chatbot" },
        { text: "Unlimited links to train on" },
        { text: "API access" },
        {
          text: "Integrations",
          tooltip: "Connect with your favorite tools and services",
        },
        { text: "Basic Analytics" },
      ],
    },
    {
      name: "Standard",
      price: 490,
      description: "Everything in Hobby, plus...",
      count: 15,
      bots: 5,
      credits: 120000,
      features: [
        { text: "3 team members" },
        { text: "2 AI Actions/chatbot" },
        {
          text: "Priority support",
          tooltip: "Response within 24 hours",
        },
        { text: "Custom branding" },
      ],
    },
  ],
};
