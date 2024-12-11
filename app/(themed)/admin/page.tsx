import AdminDashboard from "./Admin";

export default async function AdminServer() {
  // Mock data to replace database interactions
  const mockData = {
    noOfProjects: 10,
    noOfUsers: 100,
    noOfProperties: 50,
    noOfCustomers: 25,
    totalSold: 300000,
    totalPaid: 250000,
    totalExpected: 500000,
    totalSoldProperties: 30,
    totalRemainingProperties: 20,
    soldByDate: {
      "2024-12-01": 5,
      "2024-12-02": 10
    },
    analyticsByDate: {
      "2024-12-01": { clicks: 50, visits: 30 },
      "2024-12-02": { clicks: 100, visits: 70 }
    }
  };

  return <AdminDashboard data={mockData} />;
}
