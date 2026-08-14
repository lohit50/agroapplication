import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  Leaf, 
  Package, 
  ShoppingCart, 
  CheckCircle, 
  PlusCircle, 
  Apple, 
  Carrot, 
  Wheat, 
} from "lucide-react"; // Import icons

// Crop Image Mapping (Removed image URLs)


const cropImages = {
  // Fruits
  "Banana": <Package className="w-6 h-6 text-yellow-500" />,
  "Mango": <Package className="w-6 h-6 text-orange-500" />,
  "Guava": <Package className="w-6 h-6 text-green-400" />,
  "Orange": <Package className="w-6 h-6 text-orange-400" />,
  "Papaya": <Package className="w-6 h-6 text-yellow-400" />,
  "Apple": <Package className="w-6 h-6 text-red-500" />,
  "Pineapple": <Package className="w-6 h-6 text-yellow-600" />,
  "Watermelon": <Package className="w-6 h-6 text-pink-400" />,
  "Pomegranate": <Package className="w-6 h-6 text-red-600" />,
  "Peach": <Package className="w-6 h-6 text-orange-300" />,
  "Grapes": <Package className="w-6 h-6 text-purple-600" />,
  "Lemon": <Package className="w-6 h-6 text-yellow-300" />,
  "Plum": <Package className="w-6 h-6 text-purple-500" />,
  "Lychee": <Package className="w-6 h-6 text-pink-300" />,
  "Dragon Fruit": <Package className="w-6 h-6 text-pink-500" />,

  // Vegetables
  "Tomato": <Package className="w-6 h-6 text-red-500" />,
  "Brinjal": <Package className="w-6 h-6 text-purple-600" />,
  "Okra": <Package className="w-6 h-6 text-green-500" />,
  "Cucumber": <Package className="w-6 h-6 text-green-300" />,
  "Spinach": <Package className="w-6 h-6 text-green-700" />,
  "Carrot": <Package className="w-6 h-6 text-orange-400" />,
  "Cauliflower": <Package className="w-6 h-6 text-white" />,
  "Cabbage": <Package className="w-6 h-6 text-green-600" />,
  "Peas": <Package className="w-6 h-6 text-green-400" />,
  "Onion": <Package className="w-6 h-6 text-purple-300" />,
  "Potato": <Package className="w-6 h-6 text-brown-400" />,
  "Pumpkin": <Package className="w-6 h-6 text-orange-600" />,
  "Radish": <Package className="w-6 h-6 text-pink-400" />,
  "Chili": <Package className="w-6 h-6 text-red-700" />,
  "Zucchini": <Package className="w-6 h-6 text-green-200" />,

  // Other Products
  "Coconut": <Package className="w-6 h-6 text-brown-500" />,
  "Groundnut": <Package className="w-6 h-6 text-brown-600" />,
  "Millets": <Package className="w-6 h-6 text-yellow-700" />,
  "Sugarcane": <Package className="w-6 h-6 text-green-700" />,
  "Cotton": <Package className="w-6 h-6 text-white" />,
  "Sesame": <Package className="w-6 h-6 text-gray-500" />,
  "Soybean": <Package className="w-6 h-6 text-yellow-600" />,
  "Sunflower": <Package className="w-6 h-6 text-yellow-500" />,
  "Coffee": <Package className="w-6 h-6 text-brown-800" />,
  "Tea": <Package className="w-6 h-6 text-green-500" />,
  "Tobacco": <Package className="w-6 h-6 text-brown-700" />,
  "Jute": <Package className="w-6 h-6 text-green-500" />,
  "Wheat": <Package className="w-6 h-6 text-yellow-400" />,
  "Barley": <Package className="w-6 h-6 text-yellow-300" />,
  "Rice": <Package className="w-6 h-6 text-white" />,

  // Default fallback
  "default": <Package className="w-6 h-6 text-gray-500" />
};


function FarmerDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("Vegetables");
  const [cropName, setCropName] = useState("");
  const [expectedQuantity, setExpectedQuantity] = useState("");
  const [daysToHarvest, setDaysToHarvest] = useState("");
  const [inventory, setInventory] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const cropCategories = [
    { 
      name: "Fruits", 
      icon: <Leaf className="mr-2" />,
      crops: [
        "Banana", "Mango", "Guava", "Orange", "Papaya", 
        "Apple", "Pineapple", "Watermelon", "Pomegranate", "Peach", 
        "Grapes", "Lemon", "Plum", "Lychee", "Dragon Fruit"
      ]
    },
    { 
      name: "Vegetables", 
      icon: <Package className="mr-2" />,
      crops: [
        "Tomato", "Brinjal", "Okra", "Cucumber", "Spinach", 
        "Carrot", "Cauliflower", "Cabbage", "Peas", "Onion", 
        "Potato", "Pumpkin", "Radish", "Chili", "Zucchini"
      ]
    },
    { 
      name: "Other Products", 
      icon: <Package className="mr-2" />,
      crops: [
        "Coconut", "Groundnut", "Millets", "Sugarcane", 
        "Cotton", "Sesame", "Soybean", "Sunflower", "Coffee", 
        "Tea", "Tobacco", "Jute", "Wheat", "Barley", "Rice"
      ]
    }
  ];

  const handleConfirmOrder = () => {
    if (!selectedCategory || !cropName || !expectedQuantity || !daysToHarvest) {
      alert("Please fill all details before confirming!");
      return;
    }

    const newOrder = {
      category: selectedCategory,
      crop: cropName,
      quantity: expectedQuantity,
      daysToHarvest: daysToHarvest,
      icon: cropImages[cropName] || cropImages["default"],
      timestamp: new Date().toISOString(),
      status: 'Planned'
    };

    setInventory([...inventory, newOrder]);

    // Reset form
    setSelectedCategory("Vegetables");
    setCropName("");
    setExpectedQuantity("");
    setDaysToHarvest("");
  };

  const handleSubmitHarvest = () => {
    if (inventory.length === 0) {
      alert("No items in harvest inventory!");
      return;
    }
    
    // Simulate submission (no actual Google Sheets submission)
    setShowSuccessMessage(true);
    
    // Clear inventory after submission
    setInventory([]);

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center">
          <CheckCircle className="mr-2" />
          Harvest Inventory Submitted Successfully!
        </div>
      )}

      {/* Header */}
      <div 
        className="bg-gradient-to-r from-green-500 to-green-600 text-white 
        rounded-lg shadow-lg p-6 mb-8 flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold">Farmer's Harvest Planner</h1>
        <div className="flex items-center space-x-4">
          <ShoppingCart className="w-8 h-8" />
          <span className="font-semibold">{inventory.length} Planned Harvests</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side: Crop Selection */}
        <Card className="p-6 bg-white shadow-md">
          <CardHeader className="mb-4">
            <h2 className="text-2xl font-semibold text-green-600">
              Plan Your Harvest
            </h2>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Category Selection */}
            <div>
              <h3 className="mb-4 font-medium">Select Crop Category</h3>
              <div className="grid grid-cols-3 gap-4">
                {cropCategories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.name)}
                    className="flex items-center justify-center"
                  >
                    {category.icon}
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Crop Selection */}
            <div>
              <h3 className="mb-4 font-medium">Select Specific Crop</h3>
              <select
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a Crop</option>
                {cropCategories
                  .find(cat => cat.name === selectedCategory)
                  .crops.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>

            {/* Quantity Input */}
            <div>
              <h3 className="mb-4 font-medium">Expected Quantity (in kg)</h3>
              <Input 
                type="number" 
                placeholder="Enter expected harvest quantity" 
                value={expectedQuantity}
                onChange={(e) => setExpectedQuantity(e.target.value)}
              />
            </div>

            {/* Days to Harvest Input */}
            <div>
              <h3 className="mb-4 font-medium">Days Until Harvest</h3>
              <Input 
                type="number" 
                placeholder="Enter days until crop is pickable" 
                value={daysToHarvest}
                onChange={(e) => setDaysToHarvest(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button 
              onClick={handleConfirmOrder}
              className="w-full bg-green-500 hover:bg-green-600"
              disabled={!selectedCategory || !cropName || !expectedQuantity || !daysToHarvest}
            >
              <CheckCircle className="mr-2" /> Confirm Harvest Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Right Side: Inventory */}
        <Card className="p-6 bg-white shadow-md">
          <CardHeader className="mb-4 flex flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold text-green-600">
              Harvest Inventory
            </h2>
            <PlusCircle className="text-green-500" />
          </CardHeader>

          <CardContent>
            {inventory.length === 0 ? (
              <div className="text-center text-gray-500">
                No harvest plans yet. Start planning!
              </div>
            ) : (
              <div className="space-y-4">
                {inventory.map((item, index) => (
                  <div 
                    key={index} 
                    className="border p-4 rounded-lg bg-green-50 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="mr-4">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-green-700">{item.crop}</h4>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="text-sm">
                          {item.quantity} kg
                        </p>
                        <p className="text-sm text-gray-500">
                          Harvest in {item.daysToHarvest} days
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="text-green-500" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button 
              onClick={handleSubmitHarvest}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={inventory.length === 0}
            >
              Submit Harvest Inventory
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default FarmerDashboard;
