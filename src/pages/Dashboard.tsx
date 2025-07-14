import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { DepartmentCard } from "@/components/dashboard/DepartmentCard";
import { RequestSummaryGrid } from "@/components/dashboard/RequestSummaryGrid";
import { 
  Building, 
  Megaphone, 
  BookOpen, 
  TrendingUp, 
  Home,
  ShoppingCart 
} from "lucide-react";

interface User {
  name: string;
  loginId: string;
  isAuthenticated: boolean;
}

interface Request {
  orderId: string;
  requestType: string;
  requestDate: string;
  currentStatus: "Pending" | "Approved" | "In Progress" | "Completed" | "Rejected";
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [requests] = useState<Request[]>([
    {
      orderId: "ORD001",
      requestType: "Business Cards",
      requestDate: "2024-01-15",
      currentStatus: "In Progress"
    },
    {
      orderId: "ORD002", 
      requestType: "Envelopes",
      requestDate: "2024-01-10",
      currentStatus: "Completed"
    },
    {
      orderId: "ORD003",
      requestType: "Marketing Brochures",
      requestDate: "2024-01-12",
      currentStatus: "Pending"
    }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleDepartmentClick = (department: string) => {
    navigate(`/department/${department.toLowerCase()}`);
  };

  const departments = [
    {
      name: "Administration",
      icon: Building,
      description: "Office supplies & administrative materials"
    },
    {
      name: "Marketing", 
      icon: Megaphone,
      description: "Promotional materials & campaigns"
    },
    {
      name: "Investor Education",
      icon: BookOpen,
      description: "Educational resources & documentation"
    },
    {
      name: "PMS",
      icon: TrendingUp,
      description: "Portfolio management services"
    },
    {
      name: "Real Estate",
      icon: Home,
      description: "Property & facility management"
    }
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        cartCount={0} 
        onLogout={handleLogout}
        onCartClick={handleCartClick}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome, {user.name}
          </h1>
          <p className="text-muted-foreground">
            Select a department to browse and request products
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {departments.map((dept) => (
            <DepartmentCard
              key={dept.name}
              name={dept.name}
              icon={dept.icon}
              description={dept.description}
              onClick={() => handleDepartmentClick(dept.name)}
            />
          ))}
        </div>

        {/* Request Summary */}
        <RequestSummaryGrid requests={requests} />
      </main>
    </div>
  );
};

export default Dashboard;