import { useState, useEffect } from "react";
import Loader from "../../../Components/ui/Loader.jsx";
import Profile_left_part from "../components/Profile_left_part.jsx";
import AlertDialogDemo from "../components/Deletebutton.jsx";
import AvatarComponent from "../../../Components/common/AvatarComponent.jsx";

import { toast } from "react-hot-toast";
import EditButton from "../components/editbutton.jsx";
import SecuritySettings from "../components/SecuritySettings.jsx";
import AddressModal from "../components/AddressModal.jsx";

// Icons
import { Pencil, Trash2 } from "lucide-react";
import {
  FiLogOut,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiShoppingBag,
  FiPackage,
  FiHeart,
  FiEye,
  FiArrowUpRight,
  FiChevronRight,
} from "react-icons/fi";
import { FaStar, FaBolt } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

// Note: StatsPanel is kept imported in case you want to swap the static grid with it later
import StatsPanel from "../../../Components/ui/StatsPanel.jsx";

import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/useUserContext.jsx";

import {
  getUserProfile,
  updateProfile,
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../api/userApi";

import { logoutUser } from "../../auth/api/authApi";

function Settings() {
  const navigate = useNavigate();
  const { userDetails: contextUserDetails, updateUserDetails } = useUser();

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [profileChanged, setProfileChanged] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    if (contextUserDetails) {
      setUserDetails(contextUserDetails);
      setPhone(contextUserDetails?.mobile || "");
      setGender(contextUserDetails?.gender || "");
      setLoading(false);
    }
  }, [contextUserDetails]);

  useEffect(() => {
    if (contextUserDetails) return;

    const fetchUser = async () => {
      try {
        const res = await getUserProfile();

        if (res.data.success) {
          setUserDetails(res.data.user);
          setPhone(res.data.user?.mobile || "");
          setGender(res.data.user?.gender || "");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("cachedUserDetails");
          navigate("/login");
        } else {
          toast.error("Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [contextUserDetails, navigate]);

  const fetchAddresses = async () => {
    try {
      const res = await getUserAddresses();
      if (res.data.success) setAddresses(res.data.addresses);
    } catch {
      toast.error("Failed to load addresses");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSaveProfile = async () => {
    if (!profileChanged) return true;

    try {
      setIsSavingProfile(true);

      const updateData = { mobile: phone };
      if (gender) updateData.gender = gender;

      const res = await updateProfile(updateData);

      if (res.data.success) {
        toast.success("Profile updated successfully");
        setUserDetails(res.data.user);
        updateUserDetails(res.data.user);
        setProfileChanged(false);
        return true;
      }
      return false;
    } catch {
      toast.error("Failed to update profile");
      return false;
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleToggleProfileEdit = async () => {
    if (!isProfileEditing) {
      setIsProfileEditing(true);
      return;
    }
    const saved = await handleSaveProfile();
    if (saved) setIsProfileEditing(false);
  };

  const handleAddAddress = () => {
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleEditAddress = (index) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveAddress = async (data) => {
    try {
      let res;
      if (editingIndex !== null) {
        res = await updateAddress(addresses[editingIndex]?._id, data);
      } else {
        res = await createAddress(data);
      }

      if (res.data.success) {
        toast.success("Address saved");
        await fetchAddresses();
        setIsModalOpen(false);
        setEditingIndex(null);
      }
    } catch {
      toast.error("Failed to save address");
    }
  };

  const handleDeleteAddress = async (index) => {
    try {
      await deleteAddress(addresses[index]?._id);
      toast.success("Address deleted");
      fetchAddresses();
    } catch {
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      await setDefaultAddress(id);
      toast.success("Default address updated");
      fetchAddresses();
    } catch {
      toast.error("Failed to set default address");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser();

      if (res.data.success) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("cachedUserDetails");
        toast.success("Logged out successfully");
        navigate("/login");
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center dark:bg-[#131313]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-screen overflow-hidden dark:bg-[#131313] bg-[#F7F9FD] font-figtree">
        <div className="flex h-[calc(100vh-70px)] ">
          {/* LEFT PANEL */}
          <div className="hidden md:block md:w-[37%] lg:w-[28%] xl:w-[20.5%] 2xl:w-[20.5%] bg-[#FFFFFF] dark:bg-[#131313] xl:pt-2  xl:pb-0   ">
            <Profile_left_part />
          </div>

          {/* RIGHT PANEL */}
          <div className="h-full md:w-[63%] lg:w-[72%] xl:w-[73.5%] overflow-y-auto no-scrollbar bg-[#FBFBFB] dark:bg-[#131313] p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-8 pb-10">
              {/* 1. PROFILE HEADER CARD */}
              <div className="bg-white dark:bg-[#1c1c1c] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start">
                  <div className="flex gap-5">
                    {/* Avatar using existing component */}
                    <div className="bg-gray-50 dark:bg-[#292929] rounded-2xl p-1 shadow-sm border border-gray-100 dark:border-gray-700">
                      <AvatarComponent
                        name={userDetails?.name}
                        imageUrl={userDetails?.avatar}
                        size="large"
                        isLoading={loading}
                        className="w-[70px] h-[70px] rounded-xl object-cover"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                          {userDetails?.name || "User"}
                        </h1>
                        <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md text-xs font-medium">
                          <MdCheckCircle size={14} />
                          Verified Student
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <FiMapPin size={14} />
                          VIT Vellore
                        </div>
                        <div className="flex items-center gap-1">
                          <FiCalendar size={14} />
                          {userDetails?.createdAt
                            ? `Member since ${new Date(
                                userDetails.createdAt,
                              ).toLocaleString("en-US", {
                                month: "long",
                                year: "numeric",
                              })}`
                            : "Member since date unavailable"}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Quick Action Button (Optional) */}
                  <button className="hidden sm:block bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
                    Change Photo
                  </button>
                </div>
              </div>

              {/* 3. PERSONAL INFORMATION */}
              <div className="bg-white dark:bg-[#1c1c1c] rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-gray-800 relative">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                    Personal Information
                  </h2>
                  <EditButton
                    isEditing={isProfileEditing}
                    onClick={handleToggleProfileEdit}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">
                      Name
                    </label>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-[#252525] px-4 py-3 rounded-xl border border-transparent">
                      {userDetails?.name || "User"}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">
                      Email
                    </label>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-[#252525] px-4 py-3 rounded-xl border border-transparent">
                      {userDetails?.email || "-"}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setProfileChanged(true);
                      }}
                      placeholder="+91XXXXXXXXXX"
                      disabled={!isProfileEditing}
                      className={`w-full text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-[#252525] px-4 py-3 rounded-xl border outline-none transition-colors ${
                        isProfileEditing
                          ? "border-blue-500 bg-white dark:bg-[#1c1c1c] focus:ring-2 ring-blue-500/20"
                          : "border-transparent opacity-80 cursor-not-allowed"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                        setProfileChanged(true);
                      }}
                      disabled={!isProfileEditing}
                      className={`w-full text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-[#252525] px-4 py-3 rounded-xl border outline-none transition-colors appearance-none ${
                        isProfileEditing
                          ? "border-blue-500 bg-white dark:bg-[#1c1c1c] focus:ring-2 ring-blue-500/20"
                          : "border-transparent opacity-80 cursor-not-allowed"
                      }`}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. SECURITY SETTINGS */}
              <div className="w-full">
                <SecuritySettings />
              </div>

              {/* 5. ADDRESS SECTION */}
              <div className="bg-white dark:bg-[#1c1c1c] rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                    Addresses
                  </h2>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar">
                  {addresses.map((addr, index) => (
                    <div
                      key={addr._id || index}
                      className={`rounded-xl p-5 min-w-[280px] sm:min-w-[320px] flex-shrink-0 relative transition-all duration-200 border ${
                        addr.isDefault
                          ? "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 shadow-sm"
                          : "bg-gray-50 dark:bg-[#252525] border-gray-100 dark:border-gray-800"
                      }`}
                    >
                      {/* Checkmark ring */}
                      {addr.isDefault && (
                        <div className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-[10px] font-bold shadow-sm">
                          ✓
                        </div>
                      )}

                      <div
                        className={`font-semibold mb-2 text-sm ${addr.isDefault ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"}`}
                      >
                        {addr.isDefault
                          ? "Default Address"
                          : `Address ${index + 1}`}
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1.5 min-h-[60px]">
                        <div>{addr.line1}</div>
                        {addr.line2 && <div>{addr.line2}</div>}
                        <div>
                          {addr.city}, {addr.state} - {addr.pincode}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        {!addr.isDefault ? (
                          <button
                            onClick={() => handleSetDefaultAddress(addr._id)}
                            className="text-[11px] px-3 py-1.5 bg-white dark:bg-[#1c1c1c] border border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-colors shadow-sm"
                          >
                            Set as Default
                          </button>
                        ) : (
                          <div></div>
                        )}

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEditAddress(index)}
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {addresses.length < 3 && (
                    <button
                      onClick={handleAddAddress}
                      className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-5 min-w-[280px] flex-shrink-0 text-blue-500 hover:bg-blue-50 dark:hover:bg-[#252525] transition-all flex flex-col items-center justify-center gap-3 text-sm font-medium"
                    >
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-full text-blue-600 dark:text-blue-400">
                        <FiMapPin size={20} />
                      </div>
                      Add New Address
                    </button>
                  )}
                </div>
              </div>

              {/* 7. ACCOUNT ACTIONS */}
              <div className="bg-white dark:bg-[#1c1c1c] rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-6">
                  Account Actions
                </h2>

                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-50 dark:border-gray-800/50">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      Logout
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                      Sign out from all your devices
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
                  >
                    <FiLogOut size={16} />
                    Logout
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      Delete Account
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                      Permanently delete your account and data
                    </div>
                  </div>
                  <AlertDialogDemo />
                </div>
              </div>

              <AddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveAddress}
                initialData={
                  editingIndex !== null
                    ? addresses[editingIndex]
                    : { line1: "", line2: "", state: "", city: "", pincode: "" }
                }
                mode={editingIndex !== null ? "update" : "create"}
                addressId={
                  editingIndex !== null ? addresses[editingIndex]?._id : null
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
