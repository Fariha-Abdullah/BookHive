import axios from "axios";
import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

function SubscriptionPage() {
  const { user } = useContext(AuthContext);
  const email = user?.email || "";
  const [plan, setPlan] = useState("basic");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [ccv, setCcv] = useState("");

  if (!user?.email) {
    return <Redirect to="/signin" />;
  }

  const handleSubscribe = async () => {
    // Accept both 3- and 4-digit CCV
    if (ccv.length === 3 || ccv.length === 4) {
      if (email && plan) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/subscribe",
            { email, subscriptionPlan: plan }
          );
          if (response.status === 200) {
            console.log("Subscription successful:", response.data);
            alert("Subscription successful! " + response.data.message);
          } else {
            alert("Unexpected response status: " + response.status);
          }
        } catch (error) {
          console.error(error);
          alert("There was an error with the subscription.");
        }
      } else {
        alert("Please select a subscription plan and enter your email.");
      }
    } else {
      alert("Please enter a valid 3- or 4-digit CCV.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Subscribe Now
        </h2>

        {/* Plan selection */}
        <div className="flex flex-wrap justify-center mb-8">
          {["basic", "premium"].map((p) => (
            <div key={p} className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                <h3 className="text-2xl font-semibold text-center mb-4">
                  {p.charAt(0).toUpperCase() + p.slice(1)} Plan
                </h3>
                <p className="text-center text-gray-500 mb-4">
                  {p === "basic"
                    ? "Perfect for casual readers."
                    : "Best for avid readers with advanced features."}
                </p>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-pink-500">
                    ${p === "basic" ? "9.99/month" : "19.99/year"}
                  </span>
                  {/* <span className="text-gray-500">/month</span> */}
                </div>
                <ul className="list-disc list-inside mb-6">
                  <li>Access to {p === "basic" ? "free books" : "free & premium books"}</li>
                  <li>{p === "basic" ? "Basic" : "Advanced"} reading features</li>
                  <li>
                    {p === "basic" ? "Email support" : "Priority email & live chat support"}
                  </li>
                </ul>
                <button
                  onClick={() => setPlan(p)}
                  className={`w-full py-2 rounded-md ${plan === p ? "bg-pink-500 text-white" : "bg-gray-200"
                    }`}
                >
                  {plan === p ? "Selected" : `Choose ${p.charAt(0).toUpperCase() + p.slice(1)}`}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment form */}
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <p className="text-center mb-4">
            We’ll charge the card on file for your monthly plan.
          </p>
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Expiration Date (MM/YY)"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="CCV"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            value={ccv}
            onChange={(e) => setCcv(e.target.value)}
          />

          <button
            onClick={handleSubscribe}
            className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPage;
