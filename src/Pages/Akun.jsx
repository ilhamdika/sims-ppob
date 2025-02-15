import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaAt, FaCamera } from "react-icons/fa";
import ProfilePhoto from "@/assets/images/Profile Photo.PNG";

export const Akun = () => {
  const [selectedImage, setSelectedImage] = useState(ProfilePhoto);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);

        const result = await response.json();
        if (response.ok) {
          setFormData({
            email: result.data.email,
            firstName: result.data.first_name,
            lastName: result.data.last_name,
          });

          if (result.data.profile_image) {
            setSelectedImage(result.data.profile_image);
          }
        } else if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert("Gagal mengambil data profil.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 100 * 1024) {
        alert("Ukuran gambar maksimum 100 KB.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(import.meta.env.VITE_API_URL + "profile/image", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          setSelectedImage(result.data.profile_image);
          alert("Foto profil berhasil diperbarui!");
        } else {
          alert("Gagal memperbarui foto profil: " + result.message);
        }
      } catch (error) {
        console.error("Error updating profile image:", error);
        alert("Terjadi kesalahan saat memperbarui foto profil.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(import.meta.env.VITE_API_URL + "profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
        }),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert("Profil berhasil diperbarui!");
        setIsEditing(false);
      } else {
        alert("Gagal memperbarui profil.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mx-auto py-12 flex flex-col items-center">
      <div className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-300">
        <img src={selectedImage} alt="Foto Profil" className="w-full h-full object-cover" />

        <input type="file" accept="image/*" id="upload-photo" className="hidden" onChange={handleImageChange} />

        <label htmlFor="upload-photo" className="absolute bottom-2 right-2 bg-white p-2 rounded-full border border-gray-300 cursor-pointer shadow-md hover:bg-gray-100">
          <FaCamera className="text-gray-600" />
        </label>
      </div>

      <h2 className="mt-4 text-3xl font-semibold text-gray-800 dark:text-white">Profil</h2>

      <div className="w-1/2 sm:w-full mt-6 space-y-4">
        <label className="text-sm text-gray-700 dark:text-gray-300">Email</label>
        <div className="relative">
          <FaAt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input type="text" name="email" value={formData.email} onChange={handleInputChange} disabled className="w-full border-2 h-10 rounded-sm pl-10 pr-3" />
        </div>

        <label className="text-sm text-gray-700 dark:text-gray-300">Nama Depan</label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full border-2 h-10 rounded-sm pl-10 pr-3 ${isEditing ? "border-blue-500" : "border-gray-300 bg-gray-100"}`}
          />
        </div>

        <label className="text-sm text-gray-700 dark:text-gray-300">Nama Belakang</label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full border-2 h-10 rounded-sm pl-10 pr-3 ${isEditing ? "border-blue-500" : "border-gray-300 bg-gray-100"}`}
          />
        </div>

        {!isEditing ? (
          <>
            <button onClick={handleEdit} className="w-full mt-4 h-10 rounded-sm text-red-500 border border-red-500">
              Edit Profil
            </button>
            <button onClick={handleLogout} className="w-full mt-4 h-10 rounded-sm text-white bg-red-500">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={handleSave} className="w-full mt-4 h-10 rounded-sm text-white bg-red-500">
              Simpan
            </button>
            <button onClick={handleCancel} className="w-full mt-4 h-10 rounded-sm text-red-500 border border-red-500">
              Batal
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Akun;
