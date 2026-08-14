import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Plant, Translate } from "@phosphor-icons/react";
import { Users, Truck } from "lucide-react";
import "../index.css";

const translations = {
  en: {
    login: "Login",
    enterMobile: "Enter your mobile below to login to your account",
    mobileNumber: "Mobile Number",
    password: "OTP",
    accountType: "Choose Account Type",
    farmer: "Farmer",
    customer: "Customer",
    delivery: "Delivery",
    loginButton: "Login",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
  },
  ta: {
    login: "உள்நுழைக",
    enterMobile: "உங்கள் கணக்கிற்கு உள்நுழைய உங்கள் மொபைல் எண்ணை கீழே உள்ளிடுங்கள்",
    mobileNumber: "மொபைல் எண்",
    password: "கடவுஎண்",
    accountType: "கணக்கு வகையை தேர்வு செய்க",
    farmer: "விவசாயி",
    customer: "வாடிக்கையாளர்",
    delivery: "டெலிவரி",
    loginButton: "உள்நுழைக",
    noAccount: "கணக்கு இல்லையா?",
    signUp: "பதிவுசெய்ய",
  },
};

export function Login({ setRole }) {
  const [selectedRole, setSelectedRole] = useState("farmer");
  const [activeRole, setActiveRole] = useState("farmer"); // Track which button is active
  const [language, setLanguage] = useState("en"); // State to manage language
  const navigate = useNavigate(); // Add this to use navigate for routing

  const handleLogin = () => {
    setRole(selectedRole);
    if (selectedRole === "customer") {
      navigate("/customer-dashboard"); // Redirect to customer dashboard
    } else if (selectedRole === "farmer") {
      navigate("/farmer-dashboard"); // Redirect to farmer dashboard
    } else if (selectedRole === "delivery") {
      navigate("/delivery-dashboard"); // Redirect to delivery dashboard
    }
  };

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setSelectedRole(role);
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "ta" : "en")); // Toggle between English and Tamil
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <Button
        className="absolute top-0 left-0 w-[150px] lang_btn flex justify-evenly m-10"
        onClick={toggleLanguage}
      >
        {language === "en" ? "தமிழ்" : "English"}
        <Translate size={20} color="#8eab37" />
      </Button>

      <div className="flex items-center justify-center lg:py-12 lg:flex lg:justify-start lg:px-12 h-screen">
        <div className="mx-auto grid w-[350px] sm:w-[500px] lg:w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-Green1">
              {translations[language].login}
            </h1>
            <p className="text-balance text-muted-foreground">
              {translations[language].enterMobile}
            </p>
          </div>

          <div className="grid gap-4 pt-5">
            <div className="grid gap-2">
              <Label htmlFor="mobile">
                {translations[language].mobileNumber}
              </Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="+91 123-456-7890"
                required
                className="rounded border border-gray-300 focus:outline-none focus:border-white transition-colors duration-200"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">
                  {translations[language].password}
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="rounded border border-gray-300 focus:outline-none focus:border-white transition-colors duration-200"
              />
            </div>

            <div className="grid gap-2 pt-5 pb-5 w-full">
              <Label>{translations[language].accountType}</Label>
              <div className="flex justify-between pt-2 space-x-2">
                <Button
                  type="button"
                  className={`w-4/12 rounded choose_btn gap-3 ${
                    activeRole === "farmer" ? "active" : ""
                  }`}
                  onClick={() => handleRoleChange("farmer")}
                >
                  {translations[language].farmer}
                  <Plant
                    size={25}
                    color={activeRole === "farmer" ? "black" : "#8eab37"}
                    className="choose_icon"
                  />
                </Button>

                <Button
                  type="button"
                  className={`w-4/12 rounded choose_btn gap-3 ${
                    activeRole === "customer" ? "active" : ""
                  }`}
                  onClick={() => handleRoleChange("customer")}
                >
                  {translations[language].customer}
                  <Users
                    size={23}
                    color={activeRole === "customer" ? "black" : "#8eab37"}
                    className="choose_icon"
                  />
                </Button>

                <Button
                  type="button"
                  className={`w-4/12 rounded choose_btn gap-3 ${
                    activeRole === "delivery" ? "active" : ""
                  }`}
                  onClick={() => handleRoleChange("delivery")}
                >
                  {translations[language].delivery}
                  <Truck
                    size={23}
                    color={activeRole === "delivery" ? "black" : "#8eab37"}
                    className="choose_icon"
                  />
                </Button>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleLogin}
              className="w-full rounded login_btn"
            >
              {translations[language].loginButton}
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            {translations[language].noAccount}{" "}
            <Link to="/Sign-up" className="underline">
              {translations[language].signUp}
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden bg-muted lg:block relative h-screen w-full overflow-hidden rounded-md p-5">
        <img
          src="../leftbg.jpg"
          alt="Image"
          className="h-full w-full object-cover"
          style={{ borderRadius: "5px" }}
        />
      </div>
    </div>
  );
}

export default Login;