import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const username = location.state?.username || "User";

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <h1 className="text-3xl text-white">Welcome, {username}</h1>
    </div>
  );
}

export default Dashboard;
 
