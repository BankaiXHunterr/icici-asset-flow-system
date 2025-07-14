import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, QrCode, ShoppingCart, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  name: string;
  loginId: string;
  isAuthenticated: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  tat: string;
  languages: string[];
  currentInventory: number;
  rate: number;
  category: string;
}

const ProductRequest = () => {
  const { department } = useParams<{ department: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [requestFor, setRequestFor] = useState("self");
  const [employeeName, setEmployeeName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Mock data
  const categories = {
    administration: [
      "Collateral managed by Admin",
      "Office Stationery", 
      "Business Cards & Letterheads"
    ],
    marketing: [
      "Promotional Materials",
      "Campaign Collaterals",
      "Event Materials"
    ]
  };

  const products: Product[] = [
    {
      id: "1",
      name: "Envelopes",
      description: "Standard business envelopes with company branding",
      tat: "3-5 business days",
      languages: ["English", "Hindi"],
      currentInventory: 500,
      rate: 2.50,
      category: "Collateral managed by Admin"
    },
    {
      id: "2", 
      name: "Visiting Cards",
      description: "Professional visiting cards with employee details",
      tat: "7-10 business days",
      languages: ["English"],
      currentInventory: 250,
      rate: 5.00,
      category: "Collateral managed by Admin"
    }
  ];

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

  const handleAddToCart = () => {
    toast({
      title: "Product added to cart successfully",
      description: `${quantity} ${selectedProduct} has been added to your cart.`,
    });
  };

  const handleSubmit = () => {
    toast({
      title: "Request submitted successfully",
      description: "Your product request has been submitted for approval.",
    });
    navigate("/dashboard");
  };

  const selectedProductData = products.find(p => p.name === selectedProduct);
  const currentCategories = categories[department as keyof typeof categories] || [];

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
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            ← Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground capitalize">
            {department} Department
          </h1>
          <p className="text-muted-foreground">
            Request products for your department
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Request Form */}
          <Card>
            <CardHeader>
              <CardTitle>Product Request Form</CardTitle>
              <CardDescription>
                Fill in the details to request products
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Category Type</Label>
                <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                  {currentCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <RadioGroupItem value={category} id={category} />
                      <Label htmlFor={category} className="font-normal">
                        {category}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Product Selection */}
              {selectedCategory && (
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Product Name</Label>
                  <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct}>
                    {products
                      .filter(p => p.category === selectedCategory)
                      .map((product) => (
                        <div key={product.name} className="flex items-center space-x-2">
                          <RadioGroupItem value={product.name} id={product.name} />
                          <Label htmlFor={product.name} className="font-normal">
                            {product.name}
                          </Label>
                        </div>
                      ))}
                  </RadioGroup>
                </div>
              )}

              {/* Request For */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Request For</Label>
                <RadioGroup value={requestFor} onValueChange={setRequestFor}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="self" id="self" />
                    <Label htmlFor="self">Self</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="others" id="others" />
                    <Label htmlFor="others">Others</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Employee Details */}
              {requestFor === "others" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="employeeName">Employee Name</Label>
                    <Input
                      id="employeeName"
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                      placeholder="Select employee"
                    />
                  </div>
                  <div>
                    <Label htmlFor="branchAddress">Branch Address</Label>
                    <Select value={branchAddress} onValueChange={setBranchAddress}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai-bkc">Mumbai - BKC</SelectItem>
                        <SelectItem value="delhi-cp">Delhi - CP</SelectItem>
                        <SelectItem value="bangalore-mg">Bangalore - MG Road</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Details Preview */}
          {selectedProductData && (
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Review the selected product information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold text-muted-foreground">
                      PRODUCT DESCRIPTION
                    </Label>
                    <p className="text-foreground">{selectedProductData.description}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-muted-foreground">
                      TAT (Turn Around Time)
                    </Label>
                    <p className="text-foreground">{selectedProductData.tat}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-muted-foreground">
                      LANGUAGES
                    </Label>
                    <div className="flex gap-2 mt-1">
                      {selectedProductData.languages.map((lang) => (
                        <Badge key={lang} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-muted-foreground">
                      CURRENT INVENTORY
                    </Label>
                    <p className="text-foreground font-semibold">
                      {selectedProductData.currentInventory} units
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="quantity">QUANTITY ORDERED</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max={selectedProductData.currentInventory}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-24"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-muted-foreground">
                      RATE PER UNIT
                    </Label>
                    <p className="text-foreground font-semibold">
                      ₹{selectedProductData.rate.toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <Label className="text-sm font-semibold text-muted-foreground">
                      TOTAL COST
                    </Label>
                    <p className="text-xl font-bold text-foreground">
                      ₹{(selectedProductData.rate * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <QrCode className="h-4 w-4 mr-2" />
                      QR Scan
                    </Button>
                  </div>
                  
                  <Button onClick={handleAddToCart} className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button onClick={handleSubmit} variant="icici" className="w-full">
                    Submit Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductRequest;