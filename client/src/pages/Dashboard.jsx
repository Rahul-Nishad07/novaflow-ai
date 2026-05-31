import MainLayout from "../components/layout/MainLayout";

function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded shadow">
          Total Documents
        </div>

        <div className="bg-white p-5 rounded shadow">
          Pending Workflows
        </div>

        <div className="bg-white p-5 rounded shadow">
          Approved
        </div>

        <div className="bg-white p-5 rounded shadow">
          Rejected
        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;