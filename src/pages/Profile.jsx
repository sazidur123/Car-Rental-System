import React, { useState } from "react";
import { auth } from "../auth";
import { updateProfile, updateEmail } from "firebase/auth";
import toast from "react-hot-toast";
import DocumentTitle from "../hooks/DocumentTitle";

const Profile = () => {
  const user = auth.currentUser;
  const [edit, setEdit] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "/default-user.png");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPhotoURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let newPhotoURL = photoURL;
      // In production, upload imageFile and get the URL
      await updateProfile(user, {
        displayName,
        photoURL: newPhotoURL,
      });
      if (email !== user.email) {
        await updateEmail(user, email);
      }
      toast.success("Profile updated!");
      setEdit(false);
    } catch (err) {
      toast.error("Failed to update profile.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white dark:bg-base-200 rounded shadow">
      <DocumentTitle title="PlantCare | My Profile" />

      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
      <div className="flex flex-col items-center mb-4">
        <img
          src={photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full border mb-2 object-cover"
        />
        {edit && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        {edit ? (
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        ) : (
          <div className="py-2">{user?.displayName || "No name set"}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        {edit ? (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        ) : (
          <div className="py-2">{user?.email}</div>
        )}
      </div>
      {!edit ? (
        <button
          className="btn btn-primary w-full"
          onClick={() => setEdit(true)}
        >
          Update Profile
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            className="btn btn-success w-full"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            className="btn btn-ghost w-full"
            onClick={() => setEdit(false)}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;