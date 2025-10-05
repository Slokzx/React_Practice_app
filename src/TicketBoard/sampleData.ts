interface Agent {
  name: string;
}

interface Ticket {
  id: string;
  name: string;
  description: string;
  agent: Agent;
  status: string;
}

export const sampleTickets: Ticket[] = [
  {
    id: "TCK-1001",
    name: "Checkout button unresponsive on mobile",
    description:
      "Customers report that the checkout button is not responding on certain Android devices running Chrome 129.",
    agent: { name: "Rafa Patel" },
    status: "Open",
  },
  {
    id: "TCK-1002",
    name: "Promo code not applying for Prime users",
    description:
      "Prime customers cannot apply the HOLIDAY25 code. Reproduced on account types: Prime, Prime Student.",
    agent: { name: "Justin Ford" },
    status: "In Progress",
  },
  {
    id: "TCK-1003",
    name: "Order details page loads slowly",
    description:
      "Time to interactive exceeds 5s for users on 3G networks. Investigate image optimization and code splitting.",
    agent: { name: "Tanvi Shah" },
    status: "On Hold",
  },
  {
    id: "TCK-1004",
    name: "Email notifications duplicated",
    description:
      "Some users receive duplicate shipment emails. Likely triggered by a retry loop on 5xx responses.",
    agent: { name: "Bhavesh Iyer" },
    status: "Resolved",
  },
  {
    id: "TCK-1005",
    name: "Search results mismatch",
    description:
      'Searching for "wireless charger" shows unrelated accessories at the top. Ranking pipeline needs review.',
    agent: { name: "Jordan Long" },
    status: "Open",
  },
  {
    id: "TCK-1006",
    name: "iOS Safari sign-in redirect loop",
    description:
      "Users on iOS 17 report repeated redirects during OAuth flow. Session cookie attributes may be incorrect.",
    agent: { name: "Gautham Rao" },
    status: "In Progress",
  },
  {
    id: "TCK-1007",
    name: "Live chat widget not loading",
    description:
      "The live chat widget fails to initialize on Internet Explorer 11 and some corporate VPN setups.",
    agent: { name: "Tanvi Shah" },
    status: "Open",
  },
  {
    id: "TCK-1008",
    name: "Password reset emails delayed",
    description:
      "Users are experiencing delays of 15–30 minutes in receiving password reset links.",
    agent: { name: "Justin Ford" },
    status: "On Hold",
  },
  {
    id: "TCK-1009",
    name: "Dark mode toggle broken",
    description:
      "The dark mode toggle does not persist after page refresh; localStorage key may not be saved properly.",
    agent: { name: "Jordan Long" },
    status: "Resolved",
  },
  {
    id: "TCK-1010",
    name: "High CPU usage on dashboard",
    description:
      "Customer support dashboard consumes excessive CPU after opening more than 5 tabs.",
    agent: { name: "Bhavesh Iyer" },
    status: "In Progress",
  },
  {
    id: "TCK-1011",
    name: "Invoices not generating for EU customers",
    description:
      "PDF invoice generation fails when VAT ID field is populated. Likely a backend validation issue.",
    agent: { name: "Rafa Patel" },
    status: "Open",
  },
  {
    id: "TCK-1012",
    name: "Accessibility: Missing ARIA labels",
    description:
      "Screen reader users cannot navigate the new order summary component due to missing ARIA roles.",
    agent: { name: "Gautham Rao" },
    status: "Open",
  },
  {
    id: "TCK-1013",
    name: "Slack notifications not sending",
    description:
      "Integration with Slack workspace stopped working after last API update. Webhook returns 403 errors.",
    agent: { name: "Tanvi Shah" },
    status: "In Progress",
  },
  {
    id: "TCK-1014",
    name: "Search autocomplete lagging",
    description:
      "Autocomplete suggestions take ~4s to appear, impacting usability. Might be missing cache layer.",
    agent: { name: "Jordan Long" },
    status: "Open",
  },
  {
    id: "TCK-1015",
    name: "Duplicate user accounts created",
    description:
      "In rare cases, signup flow creates duplicate user records. Likely race condition in DB writes.",
    agent: { name: "Bhavesh Iyer" },
    status: "Resolved",
  },
];
