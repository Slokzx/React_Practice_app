export interface sample {
  id: number;
  company: string;
  date: string;
  recruiter: string;
  favourite: boolean;
  status: string;
}

export const sampleJobs: sample[] = [
  {
    id: 1,
    company: "OpenAI",
    date: "2025-10-22",
    recruiter: "Jane Smith",
    status: "recruiter",
    favourite: false,
  },
  {
    id: 2,
    company: "Google",
    date: "2025-10-28",
    recruiter: "Alex Johnson",
    status: "initial round",
    favourite: true,
  },
  {
    id: 3,
    company: "Meta",
    date: "2025-11-01",
    recruiter: "Priya Singh",
    status: "hiring",
    favourite: false,
  },
  {
    id: 4,
    company: "Microsoft",
    date: "2025-11-02",
    recruiter: "Carlos Lopez",
    status: "final round",
    favourite: true,
  },
  {
    id: 5,
    company: "Apple",
    date: "2025-10-30",
    recruiter: "Emily Zhao",
    status: "recruiter",
    favourite: false,
  },
  {
    id: 6,
    company: "Amazon",
    date: "2025-11-04",
    recruiter: "Michael Brown",
    status: "hiring",
    favourite: true,
  },
  {
    id: 7,
    company: "Netflix",
    date: "2025-10-27",
    recruiter: "Sara Lee",
    status: "initial round",
    favourite: false,
  },
  {
    id: 8,
    company: "Databricks",
    date: "2025-11-03",
    recruiter: "Robert Patel",
    status: "final round",
    favourite: true,
  },
  {
    id: 9,
    company: "Stripe",
    date: "2025-10-25",
    recruiter: "Olivia Wang",
    status: "hiring",
    favourite: false,
  },
  {
    id: 10,
    company: "Dropbox",
    date: "2025-11-05",
    recruiter: "David Kim",
    status: "recruiter",
    favourite: false,
  },
];
