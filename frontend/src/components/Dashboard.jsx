import axios from "axios";
import { AlertTriangle, Clock, CreditCard, Mail, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import LovedBooks from "./LovedBooks";

export default function Dashboard() {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await axios.post("http://localhost:5000/api/check-subscription/", { email: user?.email });
                setStatus(res.data);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Could not fetch subscription status.");
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchStatus();
        } else {
            setLoading(false);
        }
    }, [user?.email]);

    // Determine subscription state
    const hasSubscription = Boolean(status?.subscription);
    const isActive = status?.active;
    let stateLabel = "Not Subscribed";

    if (hasSubscription) {
        stateLabel = isActive ? "Active" : "Expired";
    }

    // Calculate days remaining if active
    const endDate = hasSubscription ? new Date(status.subscription.endDate) : null;
    const today = new Date();
    const diffInDays = endDate ? Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)) : 0;

    if (loading) {
        return (
            <div className="min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500 mx-auto mb-3"></div>
                    <p className="text-gray-600">Loading subscription status...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[300px] flex items-center justify-center">
                <div className="text-center bg-red-50 p-6 rounded-lg max-w-md">
                    <AlertTriangle size={36} className="text-red-500 mx-auto mb-3" />
                    <p className="text-red-600 font-medium mb-1">Error Loading Data</p>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Subscription Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-pink-500 to-red-400 p-5">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <CreditCard size={24} className="mr-2" />
                        Your Subscription
                    </h2>
                </div>

                <div className="p-6">
                    {/* User Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <User size={32} className="text-gray-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
                            <div className="flex items-center text-gray-500 mt-1">
                                <Mail size={14} className="mr-1" />
                                <span>{user?.email}</span>
                            </div>
                        </div>
                    </div>

                    {!hasSubscription ? (
                        <div className="bg-yellow-50 p-5 rounded-lg text-center">
                            <p className="text-lg font-semibold text-yellow-800 mb-2">Not Subscribed</p>
                            <p className="text-gray-600 mb-4">Start a subscription to enjoy premium features.</p>
                            <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg transition-colors duration-200">
                                Subscribe Now
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Plan & Status */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Active Plan</p>
                                    <p className="text-lg font-medium text-gray-800 capitalize">{status.subscription.subscriptionPlan}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Status</p>
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {stateLabel}
                                    </span>
                                </div>
                            </div>

                            {/* Subscription Period */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Start Date</p>
                                    <p className="text-base font-medium text-gray-800">
                                        {new Date(status.subscription.startDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">End Date</p>
                                    <p className="text-base font-medium text-gray-800">
                                        {new Date(status.subscription.endDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Days Remaining or Expired Message */}
                            {isActive ? (
                                <div className="bg-blue-50 p-5 rounded-lg flex items-center">
                                    <Clock size={32} className="text-blue-500 mr-4" />
                                    <div>
                                        <p className="text-sm text-blue-700 mb-1">Days Remaining</p>
                                        <p className="text-2xl font-bold text-blue-900">{diffInDays}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-red-50 p-5 rounded-lg text-center">
                                    <p className="text-lg font-semibold text-red-800 mb-2">Your subscription has expired.</p>
                                    <p className="text-gray-600 mb-4">Renew to continue enjoying premium features.</p>
                                    <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg transition-colors duration-200">
                                        Renew Now
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Loved Books Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <LovedBooks />
                </div>
            </div>
        </div>
    );
}
