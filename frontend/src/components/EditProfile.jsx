import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Base_Url } from "../utils/constants";
import toast from "react-hot-toast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const EditUser = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${Base_Url}/profile/edit`,
        { firstName, lastName, gender, age, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setNotification(true);
      setTimeout(() => setNotification(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong!");
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      await axios.post(`${Base_Url}/upload/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setPhotoUrl(URL.createObjectURL(file));
      toast.success("Image Uploaded Successfully");
    } catch {
      setError("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 flex flex-col items-center">
      {/* Form Card */}
      <div className="w-full max-w-2xl bg-base-100 p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={photoUrl}
            alt="Profile"
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl border-4 border-primary shadow"
          />
        </div>

        {/* Upload Button */}
        <div className="mb-4 text-center">
          <input
            type="file"
            onChange={handlePhotoUpload}
            className="file-input file-input-bordered file-input-sm sm:file-input-md"
          />
          {uploading && (
            <p className="text-sm text-blue-500 mt-2">Uploading...</p>
          )}
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full text-xl"
            placeholder="First Name"
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full text-xl"
            placeholder="Last Name"
          />

          <select
            className="select select-bordered w-full text-xl"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="number"
            min="1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input input-bordered w-full text-xl"
            placeholder="Age"
          />

          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="textarea textarea-bordered w-full text-xl"
            placeholder="About You"
            rows={4}
          ></textarea>

          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Photo URL"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}

        {/* Save Button */}
        <button
          onClick={EditUser}
          className="btn btn-primary w-full mt-6 text-white font-semibold"
        >
          Save Profile
        </button>
      </div>

      {/* Profile Preview */}
      <div className="w-full max-w-2xl mt-10 bg-base-100 p-8 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-center mb-4">Profile Preview</h2>
        <div className="flex flex-col items-center">
          <img
            src={photoUrl}
            alt="Profile"
            className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-xl border-4 border-secondary shadow"
          />
          <h3 className="text-xl font-semibold mt-4">
            {firstName} {lastName}
          </h3>
          <p className="text-sm text-gray-500">
            {gender}, {age}
          </p>
          <p className="mt-3 text-center text-base-content whitespace-pre-wrap break-words px-4">
            {about}
          </p>
        </div>
      </div>

      {/* Toast */}
      {notification && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all">
          ✅ Profile updated successfully!
        </div>
      )}
    </div>
  );
};

export default EditProfile;
