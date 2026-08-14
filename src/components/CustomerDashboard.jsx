import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Leaf, Package, ShoppingCart, CheckCircle, PlusCircle, MinusCircle, XCircle } from "lucide-react"; // Icons

const cropImages = {
  "Banana": <Package className="w-6 h-6 text-yellow-500" />,
  "Mango": <Package className="w-6 h-6 text-orange-500" />,
  "Tomato": <Package className="w-6 h-6 text-red-500" />,
  "Carrot": <Package className="w-6 h-6 text-orange-400" />,
  "Coconut": <Package className="w-6 h-6 text-brown-500" />,
  "Wheat": <Package className="w-6 h-6 text-yellow-400" />,
  "default": <Package className="w-6 h-6 text-gray-500" />
};

function CustomerDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("Fruits");
  const [cropName, setCropName] = useState("");
  const [timesPerWeek, setTimesPerWeek] = useState(1);
  const [deliveryDay, setDeliveryDay] = useState("Monday");
  const [basket, setBasket] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  const cropCategories = [
    { 
      name: "Fruits", 
      icon: <Leaf className="mr-2" />,
      crops: ["Banana", "Mango", "Apple", "Pineapple", "Watermelon"]
    },
    { 
      name: "Vegetables", 
      icon: <Package className="mr-2" />,
      crops: ["Tomato", "Carrot", "Cucumber", "Spinach", "Potato"]
    },
    { 
      name: "Other Products", 
      icon: <Package className="mr-2" />,
      crops: ["Coconut", "Wheat", "Sugarcane", "Millets", "Coffee"]
    }
  ];

  // Handle adding selected product to the basket automatically
  const handleCropSelection = (crop) => {
    const newItem = {
      crop: crop,
      quantity: 1, // Default quantity
      icon: cropImages[crop] || cropImages["default"],
      category: selectedCategory,
    };
    setBasket([...basket, newItem]);
    setCropName(""); // Reset crop selection after adding
  };

  const handleChangeQuantity = (index, action) => {
    const newBasket = [...basket];
    if (action === "increase") {
      newBasket[index].quantity += 1;
    } else if (action === "decrease" && newBasket[index].quantity > 1) {
      newBasket[index].quantity -= 1;
    }
    setBasket(newBasket);
  };

  const handleRemoveFromBasket = (index) => {
    const newBasket = basket.filter((_, i) => i !== index);
    setBasket(newBasket);
  };

  const handleConfirmOrder = () => {
    if (!basket.length || !timesPerWeek || !deliveryDay) {
      alert("Please fill all details before confirming!");
      return;
    }

    const newOrder = {
      products: basket,
      timesPerWeek,
      deliveryDay,
      timestamp: new Date().toISOString(),
    };
    setOrderDetails(newOrder);

    // Reset after order confirmation
    setBasket([]);
    setTimesPerWeek(1);
    setDeliveryDay("Monday");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Order Confirmation Box */}
      {orderDetails && (
        <div className="fixed top-50 left-4 bg-green-600 text-white p-6 rounded-xl shadow-lg z-50 w-96 space-y-4">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-white mr-2" />
            <h2 className="text-xl font-bold">Order Confirmed</h2>
          </div>
          {orderDetails.products.map((item, index) => (
            <div key={index} className="mb-4 flex items-center space-x-4">
              {/* <div className="p-2 bg-white rounded-md"> */}
              <div>{item.icon}</div>
              <div className="flex-1 space-y-2">
                
                  <h4 className="font-bold text-black">{item.crop}</h4>
                
                <p className="text-sm text-gray-600">{item.quantity} kg</p>
              </div>
              {/* </div> */}
            </div>
          ))}
          <p className="mb-1"><strong>Frequency:</strong> {orderDetails.timesPerWeek} times per week</p>
          <p><strong>Delivery Day:</strong> {orderDetails.deliveryDay}</p>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customer's Order Planner</h1>
        <div className="flex items-center space-x-4">
          <ShoppingCart className="w-8 h-8" />
          <span className="font-semibold">{orderDetails ? "Order Confirmed" : "No Order Yet"}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side: Product Selection */}
        <div className="space-y-8">
          <Card className="p-6 bg-white shadow-md">
            <CardHeader className="mb-4">
              <h2 className="text-2xl font-semibold text-blue-600">Choose Your Product</h2>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Category Selection */}
              <div>
                <h3 className="mb-4 font-medium">Select Product Category</h3>
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
                <h3 className="mb-4 font-medium">Select Specific Product</h3>
                <select
                  value={cropName}
                  onChange={(e) => {
                    setCropName(e.target.value);
                    handleCropSelection(e.target.value); // Auto-add product to basket
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a Product</option>
                  {cropCategories
                    .find(cat => cat.name === selectedCategory)
                    .crops.map(crop => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Basket and Final Details */}
        <div className="space-y-8">
          <Card className="p-6 bg-white shadow-md">
            <CardHeader className="mb-4">
              <h2 className="text-2xl font-semibold text-blue-600">Your Basket</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex overflow-x-auto space-x-4">
                {basket.map((item, index) => (
                  <div key={index} className="border p-4 rounded-lg bg-green-50 flex items-center space-x-2">
                    <div>{item.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-green-700">{item.crop}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" onClick={() => handleChangeQuantity(index, "decrease")} className="p-1 text-xs">
                        <MinusCircle className="w-4 h-4" />
                      </Button>
                      <span>{item.quantity} kg</span>
                      <Button variant="outline" onClick={() => handleChangeQuantity(index, "increase")} className="p-1 text-xs">
                        <PlusCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button variant="outline" onClick={() => handleRemoveFromBasket(index)} className="text-red-500 p-1">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Frequency and Delivery Date */}
              <div>
                <h3 className="mb-4 font-medium">Times per Week</h3>
                <Input
                  type="number"
                  placeholder="Enter frequency (1-7)"
                  value={timesPerWeek}
                  onChange={(e) => setTimesPerWeek(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mb-4 font-medium">Select Delivery Day</h3>
                <select
                  value={deliveryDay}
                  onChange={(e) => setDeliveryDay(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleConfirmOrder}
                className="w-full bg-blue-500 hover:bg-blue-600"
                disabled={basket.length === 0 || !timesPerWeek || !deliveryDay}
              >
                <CheckCircle className="mr-2" /> Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
