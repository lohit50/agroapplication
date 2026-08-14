import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Plant, Translate } from "@phosphor-icons/react";
import { Users } from "lucide-react";
import "../index.css";

// Translations Object
const translations = {
  en: {
    signUp: "Sign Up",
    enterDetails: "Enter your details below to create an account",
    accountType: "Choose Account Type",
    farmer: "Farmer",
    customer: "Customer",
    name: "Name",
    mobileNumber: "Mobile Number",
    address: "Address",
    pincode: "Pincode",
    farmDetails: "Farm Details (For Farmers Only)",
    noAccount: "Already have an account?",
    login: "Login",
  },
  ta: {
    signUp: "பதிவுசெய்ய",
    enterDetails: "உங்கள் கணக்கை உருவாக்க உங்கள் விவரங்களை உள்ளிடுங்கள்",
    accountType: "கணக்கு வகையை தேர்வு செய்க",
    farmer: "விவசாயி",
    customer: "வாடிக்கையாளர்",
    name: "பெயர்",
    mobileNumber: "மொபைல் எண்",
    address: "முகவரி",
    pincode: "அஞ்சல் குறியீடு",
    farmDetails: "பண்ணை விவரங்கள் (விவசாயிகளுக்கு மட்டும்)",
    noAccount: "ஏற்கனவே ஒரு கணக்கு உள்ளதா?",
    login: "உள்நுழைக",
  },
};

export function Signup() {
  const [selectedRole, setSelectedRole] = useState("farmer");
  const [activeRole, setActiveRole] = useState("farmer"); // Track which button is active
  const [language, setLanguage] = useState("en"); // State to manage language

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setSelectedRole(role); // Also update the selected role
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "ta" : "en")); // Toggle between English and Tamil
  };

  return (
    <div className="flex items-center justify-center lg:py-12 lg:px-12 h-screen w-full">
      <Button
        className="absolute top-0 left-0 w-[150px] lang_btn flex justify-evenly m-10"
        onClick={toggleLanguage}
      >
        {language === "en" ? "தமிழ்" : "English"}
        <Translate size={20} color="#8eab37" />
      </Button>

      <div className="mx-auto grid w-[350px] sm:w-[500px] lg:w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold text-Green1">
            {translations[language].signUp}
          </h1>
          <p className="text-balance text-muted-foreground">
            {translations[language].enterDetails}
          </p>
        </div>

        <div className="grid gap-4 pt-5">
          <div className="grid gap-2 pt-5 pb-5 w-full">
            <Label>{translations[language].accountType}</Label>
            <div className="flex justify-between pt-2">
              {/* Farmer Button */}
              <Button
                type="button"
                className={`w-5/12 rounded choose_btn gap-3 ${
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

              {/* Customer Button */}
              <Button
                type="button"
                className={`rounded choose_btn gap-3 px-4 py-2 ${
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
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">{translations[language].name}</Label>
            <Input
              id="name"
              type="text"
              placeholder={translations[language].name}
              required
              className="rounded border border-gray-300 focus:outline-none focus:border-white transition-colors duration-200"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mobile">{translations[language].mobileNumber}</Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="+91 123-456-7890"
              required
              className="rounded border border-gray-300 focus:outline-none focus:border-white transition-colors duration-200"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">{translations[language].address}</Label>
            <Input
              id="address"
              type="text"
              placeholder={translations[language].address}
              required
              className="rounded border border-gray-300 focus:outline-none focus:border-white transition-colors duration-200"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="pincode">{translations[language].pincode}</Label>
            <Input
              id="pincode"
              type="text"
              placeholder="600001"
              required
              className="rounded border border-gray-300 focus:outline-none focus:border-white transition-colors duration-200"
            />
          </div>

          {/* Conditional Form Fields */}
          {activeRole === "farmer" && (
            <div className="grid gap-2">
              <Label htmlFor="farmDetails">
                {translations[language].farmDetails}
              </Label>
              <Input
  id="farmDetails"
  type="text"
  placeholder={translations[language].farmDetails}
  className="rounded border border-gray-300 custom-input transition-colors duration-200"
/>
            </div>
          )}

          <Button type="submit" className="w-full rounded login_btn">
            {translations[language].signUp}
          </Button>
        </div>

        <div className="mt-4 text-center text-sm">
          {translations[language].noAccount}{" "}
          <a href="/" className="underline">
            {translations[language].login}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
