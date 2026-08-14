import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, User, Phone, Package, CheckCircle } from "lucide-react";

const DeliveryDashboard = () => {
  const [isAccepted, setIsAccepted] = useState(false); // New state to track if the orders are accepted
  const [activeOrders, setActiveOrders] = useState([
    {
      id: 1,
      pickupLocation: {
        name: "Sathyamangalam Organic Farms",
        address:
          "Near Bhavani River, Sathyamangalam, Erode District, Tamil Nadu 638401",
      },
      dropLocation: {
        name: "Customer Residence",
        address: "123 Green Street, Erode, Tamil Nadu 638001",
      },
      products: [
        { name: "Organic Tomatoes", quantity: 5 },
        { name: "Fresh Spinach", quantity: 2 },
      ],
      status: "Pending Pickup",
    },
    {
      id: 2,
      pickupLocation: {
        name: "Puliyampatti Agricultural Cooperative",
        address: "Puliyampatti Village, Erode District, Tamil Nadu 638452",
      },
      dropLocation: {
        name: "Urban Organic Store",
        address: "45 Market Road, Erode, Tamil Nadu 638001",
      },
      products: [
        { name: "Organic Carrots", quantity: 10 },
        { name: "Fresh Beetroot", quantity: 3 },
      ],
      status: "In Transit",
    },
  ]);

  const deliveryPersonDetails = {
    name: "Selvam Rajendran",
    age: 35,
    phone: "+91 98765 43210",
    address: "20/A, Kavundampalayam, Erode, Tamil Nadu 638001",
    vehicleNumber: "TN 38 AB 1234",
    totalOrdersToday: 12,
    completedOrders: 8,
  };

  const handleAcceptOrders = () => {
    // Toggle the state to show the orders after accepting
    setIsAccepted(true);
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50 p-8 font-sans">
      {/* Right Side - Delivery Person Profile */}
      <div className="w-1/3 pr-6 mt-12">
        <Card className="rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center py-4">
            <Truck size={32} className="mr-3" />
            <h1 className="text-2xl font-bold tracking-wide">
              Delivery Profile
            </h1>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <User className="text-gray-500" />
              <span className="font-semibold text-lg text-gray-700">
                {deliveryPersonDetails.name}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="text-gray-500" />
              <span className="text-gray-600">
                {deliveryPersonDetails.phone}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="text-gray-500" />
              <span className="text-sm text-gray-600">
                {deliveryPersonDetails.address}
              </span>
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Package className="text-blue-500" />
                  <span className="text-gray-600">Total Orders Today</span>
                </div>
                <span className="font-bold text-gray-700">
                  {deliveryPersonDetails.totalOrdersToday}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" />
                  <span className="text-gray-600">Completed Orders</span>
                </div>
                <span className="font-bold text-green-500">
                  {deliveryPersonDetails.completedOrders}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Section: Receive More Deliveries */}
        <div className="mt-6 p-4 rounded-lg shadow-sm border border-gray-200 bg-white flex justify-between items-center">
          <p className="text-gray-700 font-medium text-sm">
            New deliveries are available. Accept now?
          </p>
          <div className="flex space-x-2">
            <Button
              className="bg-green-500 text-white px-4 rounded-md hover:bg-green-600"
              onClick={handleAcceptOrders} // Trigger to accept orders
            >
              Accept
            </Button>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-100"
            >
              Reject
            </Button>
          </div>
        </div>
      </div>

      {/* Left Side - Active Orders */}
      <div className="w-2/3">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Active Delivery Orders
        </h2>

        {isAccepted &&
          activeOrders.map((order) => (
            <Card
              key={order.id}
              className="mb-6 p-5 bg-white shadow-sm rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-700">
                    Order #{order.id}
                  </h3>
                  <span
                    className={`text-sm font-medium ${
                      order.status === "In Transit"
                        ? "text-blue-500"
                        : "text-orange-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <Button className="bg-green-500 text-white px-4 rounded-md hover:bg-green-600">
                  Update Status
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-1 text-gray-700">
                    Pickup Location
                  </h4>
                  <div className="flex items-start space-x-2">
                    <MapPin className="text-green-500" size={20} />
                    <div>
                      <p className="font-medium">{order.pickupLocation.name}</p>
                      <p className="text-sm text-gray-500">
                        {order.pickupLocation.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-1 text-gray-700">
                    Drop Location
                  </h4>
                  <div className="flex items-start space-x-2">
                    <MapPin className="text-red-500" size={20} />
                    <div>
                      <p className="font-medium">{order.dropLocation.name}</p>
                      <p className="text-sm text-gray-500">
                        {order.dropLocation.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Products</h4>
                <div className="space-y-1">
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm text-gray-600 border-b pb-1"
                    >
                      <span>{product.name}</span>
                      <span>Quantity: {product.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default DeliveryDashboard;
