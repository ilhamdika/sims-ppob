import React, { useState } from "react";
import { FaUser, FaAt, FaCamera } from "react-icons/fa";
import ProfilePhoto from "../assets/images/Profile Photo.PNG";

export const Akun = () => {
  const [selectedImage, setSelectedImage] = useState(ProfilePhoto);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "emailkuuu@example.com",
    firstName: "Nama Depanku",
    lastName: "Nama Belakangku",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Data disimpan:", formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      email: "emailkuuu@example.com",
      firstName: "Nama Depanku",
      lastName: "Nama Belakangku",
    });
  };

  return (
    <div className="container mx-auto py-12 flex flex-col items-center">
      <div className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-300">
        <img src={selectedImage} alt="Foto Profil" className="w-full h-full object-cover" />

        <input type="file" accept="image/*" id="upload-photo" className="hidden" onChange={handleImageChange} disabled={!isEditing} />

        {isEditing && (
          <label htmlFor="upload-photo" className="absolute bottom-2 right-2 bg-white p-2 rounded-full border border-gray-300 cursor-pointer shadow-md hover:bg-gray-100">
            <FaCamera className="text-gray-600" />
          </label>
        )}
      </div>

      <h2 className="mt-4 text-3xl font-semibold text-gray-800 dark:text-white">Nama Pengguna</h2>

      <div className="w-1/2 sm:w-full mt-6 space-y-4">
        <label className="text-sm text-gray-700 dark:text-gray-300">Email</label>
        <div className="relative">
          <FaAt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input type="text" name="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} className={`w-full border-2 h-10 rounded-sm pl-10 pr-3 ${isEditing ? "border-blue-500" : "border-gray-300 bg-gray-100"}`} />
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
            <button type="button" className="w-full mt-4 h-10 rounded-sm text-white bg-red-500">
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
