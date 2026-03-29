import React, { useState, useEffect } from "react";
import Loader from "../Components/Loder.jsx";
import Profile_left_part from "../Components/Profile_left_part";
import AlertDialogDemo from "../Components/Deletebutton";
import Image11 from "../assets/profilepho.png";

import { toast } from "react-hot-toast";
import EditButton from "../Components/editbutton";
import SecuritySettings from "../Components/SecuritySettings";
import Header from "../Components/Header";
import AddressModal from "../Components/AddressModal";
import { Pencil, Plus, Trash2 } from "lucide-react";
import bag from "../assets/bag.png";
import bluebag from "../assets/bluebag.png";
import { FiLogOut } from "react-icons/fi";
import StatsPanel from "../Components/StatsPanel";

function Profile() {
  const [uploading, setUploading] = useState(false);

  const [otp, setOtp] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    line1: "",
    line2: "",
    state: "",
    city: "",
    pincode: "",
  });

  /* useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserDetails(null);
        setAddresses([]);
        setPhone("");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserDetails(data);
          setPhone(data.phone || "");

          if (Array.isArray(data.savedAddresses)) {
            setAddresses(data.savedAddresses);
          } else if (data.addressDetails) {
            setAddresses([data.addressDetails]);
          }
        } else {
          setUserDetails({
            firstName: "",
            lastName: "",
            email: user.email || "",
            photoURL: "",
          });
        }
      } catch (err) {
        console.error("Profile load error:", err);
        toast.error(err.message || "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSaveAddress = async (newAddressData) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      let updated = [...addresses];

      if (editingIndex !== null) {
        updated[editingIndex] = newAddressData;
      } else {
        updated.push(newAddressData);
      }

      setAddresses(updated);

      const docRef = doc(db, "Users", user.uid);
      await updateDoc(docRef, {
        savedAddresses: updated,
        addressDetails: updated[0] || {},
      });

      toast.success(
        editingIndex !== null ? "Address updated!" : "New address added!"
      );
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to update address");
    }
  };

  const handleDeleteAddress = async (indexToDelete) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    try {
      const user = auth.currentUser;
      if (!user) return;

      const updated = addresses.filter((_, i) => i !== indexToDelete);
      setAddresses(updated);

      await updateDoc(doc(db, "Users", user.uid), {
        savedAddresses: updated,
        addressDetails: updated[0] || {},
      });

      toast.success("Address deleted successfully");
    } catch (err) {
      toast.error("Failed to delete address");
    }
  };

  const sendOtp = async () => {
    if (!phone.startsWith("+")) {
      return toast.error("Use +91XXXXXXXXXX format");
    }

    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible" },
          auth
        );
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      setConfirmResult(confirmation);
      setOtpSent(true);
      toast.success("OTP sent!");
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    if (!otp || !confirmResult) return toast.error("Enter OTP");

    try {
      await confirmResult.confirm(otp);
      const user = auth.currentUser;
      await updateDoc(doc(db, "Users", user.uid), { phone });

      toast.success("Phone verified!");
      setOtp("");
      setOtpSent(false);
    } catch {
      toast.error("OTP verification failed");
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    window.location.href = "/login";
  };

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading]);

  if (loading) return <Loader />;

  if (!userDetails) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div>
          <p className="text-lg text-center">No profile data found.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => (window.location.href = "/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
 */
  return (
    <>
      <div className="w-full h-screen overflow-hidden dark:bg-[#131313]">
        <Header bagUrl={bag} darkUrl={bluebag} />

        <div className="flex h-[calc(100vh-70px)]">
          {/* LEFT PANEL */}
          <div className="hidden md:block md:w-[37%] lg:w-[28%] xl:w-[26%] pt-[3.5vh] pl-[2vw] pr-[1.75vw] pb-[2vh] bg-[#FBFBFB]  dark:bg-[#131313] xl:pt-[2.5vh] xl:-mr-4 xl:pb-0">
            <Profile_left_part />
          </div>

          {/* RIGHT PANEL */}
          <div className="h-full md:w-[63%] lg:w-[72%] xl:w-[73.5%] overflow-y-auto no-scrollbar bg-[#FBFBFB] dark:bg-[#131313]">
            {/* PROFILE BANNER */}
            <div className="bg-white dark:bg-[#1A1D20] rounded-t-2xl shadow mx-[3vw] mt-[5vh] overflow-hidden xl:mt-[2.5vh]">
              <div className="bg-gradient-to-l from-[#364EF2] to-[#534FF2] flex items-center px-[3vw] py-[2vh] xl:py-[2.5vh]">
                <div className="relative">
                  <div className="bg-[#292929] rounded-full p-1 border-white border shadow">
                    <span></span>
                    <img
                      src={ Image11}
                      alt="Profile"
                      className="w-[70px] h-[70px] rounded-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col ml-[2vw] xl:ml-[1vw] font-poppins">
                  <div className="text-white text-[22px] font-medium xl:text-[20px]">
                    { "User"} 
                  </div>
                  <div className="text-white text-sm opacity-80 font-light">
                    Member since October 2022
                  </div>
                </div>
              </div>
            </div>

            <StatsPanel />

            {/* PERSONAL INFO */}
            <div className="bg-white dark:bg-[#1A1D20] rounded-2xl shadow mt-[3vh] mx-[3vw] p-[3vh] xl:p-[5vh] relative font-poppins">
              <div className="text-xl dark:text-[#D7D7D7] xl:text-lg font-semibold mb-4">
                Personal Information
              </div>

              <div className="grid grid-cols-2 gap-y-4 xl:px-3">
                <div className="flex-col items-center">
                  <div className="text-[#848484] dark:text-[#848484] text-sm">
                    Name
                  </div>
                  <div className="text-lg xl:mt-1 dark:text-[#BBC2C9]">
                    { "User"}
                  </div>
                </div>

                <div className="flex-col items-center">
                  <div className="text-[#848484] dark:text-[#848484] text-sm">
                    Email
                  </div>
                  <div className="text-lg xl:mt-1 dark:text-[#BBC2C9]">
                    kamalsinha7305@gmail.com{/* {userDetails.email} */}
                  </div>
                </div>

                <div className="flex-col items-center">
                  <div className="text-[#848484] text-sm dark:text-[#848484]">
                    Phone
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91XXXXXXXXXX"
                    className="bg-transparent border p-1 rounded xl:mt-1 outline-none dark:border-[#848484]"
                  />
                  <button /* onClick={sendOtp} */ className="ml-2 text-blue-500">
                    Send OTP
                  </button>

                  {otpSent && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="border p-1 rounded"
                      />
                      <button /* onClick={verifyOtp} */ className="text-green-500">
                        Verify
                      </button>
                    </div>
                  )}
                  <div id="recaptcha-container"></div>
                </div>

                <div className="flex-col items-center">
                  <div className="text-[#848484] text-sm dark:text-[#848484]">
                    Gender
                  </div>
                  <div className="text-lg xl:mt-1 dark:text-[#BBC2C9]">
                    Male
                  </div>
                </div>
              </div>

              <div className="absolute top-9 right-6">
                <EditButton />
              </div>
            </div>

            <SecuritySettings />

            {/* ADDRESS SECTION */}
            <div className="bg-white dark:bg-[#1A1D20] rounded-2xl shadow mt-[3vh] mx-[3vw] p-[3vh] xl:p-[5vh] font-poppins">
              <div className="text-xl xl:text-lg font-semibold mb-4 dark:text-[#D7D7D7]">
                Addresses
              </div>

              <div className="flex flex-wrap gap-4">
                {addresses.map((addr, index) => (
                  <div
                    key={index}
                    className="bg-[#F2F4FF] dark:bg-[#2D3339] rounded-xl p-4 xl:px-8 xl:py-5 w-[90%] md:w-[45%] xl:w-[38%] relative"
                  >
                    <div className="font-semibold mb-1 dark:text-[#EBEDFF]">
                      {index === 0 ? "Campus Address" : `Address ${index + 1}`}
                    </div>

                    <div className="text-sm opacity-80 dark:text-[#7991A4]">
                      <div>{addr.line1}</div>
                      <div>{addr.line2}</div>
                      <div>
                        {addr.city} - {addr.pincode}
                      </div>
                    </div>

                    <div className="flex gap-2 absolute bottom-3 right-3">
                      <button /* onClick={() => handleDeleteAddress(index)} */ > 
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                      <button
                       /*  onClick={() => {
                          setEditingIndex(index);
                          setIsModalOpen(true);
                        }} */
                        className="dark:text-[white]"
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </div>
                ))}

                {addresses.length < 3 && (
                  <button
                    /* onClick={() => {
                      setEditingIndex(null);
                      setIsModalOpen(true);
                    }} */
                    className="border-2 border-dashed rounded-lg p-4 text-blue-500 xl:px-6 hover:bg-blue-100 transition-all duration-150 ease-linear"
                  >
                    + Add New Address
                  </button>
                )}
              </div>
            </div>

            <AddressModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
             /*  onSave={handleSaveAddress} */
              initialData={
                editingIndex !== null
                  ? addresses[editingIndex]
                  : {
                      line1: "",
                      line2: "",
                      state: "",
                      city: "",
                      pincode: "",
                    }
              }
            />

            {/* ACCOUNT ACTIONS */}
            <div className="bg-white dark:bg-[#1A1D20] rounded-2xl shadow mt-[3vh] mx-[3vw] p-[3vh] xl:p-[5vh] mb-[5vh] font-poppins ">
              <div className="text-xl xl:text-lg font-semibold mb-4 xl:mb-5 dark:text-[#AAB9C5]">
                Account Actions
              </div>

              <div className="flex justify-between items-center mb-6 xl:px-3">
                <div>
                  <div className="text-base font-medium dark:text-[#BBC2C9]">
                    Logout
                  </div>
                  <div className="text-sm text-[#64707D] dark:text-[#64707D]">
                    Sign out from all devices
                  </div>
                </div>
                <button
                 /*  onClick={handleLogout} */
                  className="bg-[#E5E8FF] px-4 py-2 rounded-lg hover:bg-[#d6dbfd] flex items-center justify-center gap-2 xl:px-[1.4vw] xl:py-[1vh] text-[15px] transition-all duration-300"
                >
                  <FiLogOut className="text-[#364EF2]" />
                  <span className="text-[#313131] dark:text-[#313131]">
                    Logout
                  </span>
                </button>
              </div>

              <div className="flex justify-between items-center xl:px-3">
                <div>
                  <div className="text-base font-medium dark:text-[#BBC2C9]">
                    Delete Account
                  </div>
                  <div className="text-sm text-[#64707D] dark:text-[#64707D]">
                    Permanently delete your account
                  </div>
                </div>
                <AlertDialogDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
