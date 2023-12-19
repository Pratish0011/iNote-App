import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutUserStart, signoutUserFailure, signoutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/userSlice/userSlice";
import { useNavigate } from 'react-router-dom'
import { storage } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


  const options = {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      }



function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const fileRef = useRef();
  const [edit, setEdit] = useState(true);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  function handleEdit(e) {
    e.preventDefault()
    setEdit(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data))
      }
      toast.success("Updated Successfully")

      dispatch(updateUserSuccess(data))
      setEdit(true)

    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  async function handleLogout() {
    try {
      dispatch(signoutUserStart())
      const res = await fetch(`api/auth/sign-out`)
      const data = await res.json()
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message))
      }
      dispatch(signoutUserSuccess(data))
      toast.success("Logged out successfully!")
      navigate('/sign-in')
    } catch (error) {
      dispatch(signoutUserFailure(error.message))

    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-myColor mt-10 rounded-lg p-4 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-8">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          type="file"
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="Photo"
          className={`rounded-full cursor-pointer w-40 h-40 ${filePerc && filePerc < 100 ? 'opacity-50' : ''}`}
        />

        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full" action="">
          <input
            disabled={edit}
            id="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg"
            type="text"
            name=""
          />
          <input
            disabled={edit}
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg"
            type="text"
            name=""
          />
          <input
            disabled={edit}
            id="password"
            onChange={handleChange}
            className="px-4 py-2 rounded-lg"
            type="text"
            name=""
          />
          <div className="flex justify-between">
            <button
              onClick={handleEdit}
              className="bg-slate-600 text-white px-4 py-2 rounded-lg text-xl font-semibold "
            >
              Edit
            </button>
            <button
              type="submit"
              className="bg-slate-600 text-white px-4 py-2 rounded-lg text-xl font-semibold "
            >
              {
                loading ? "Updating..." : "Update"
              }
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-xl font-semibold "
            >
              Log Out
            </button>
          </div>
        </form>
      </div>
      {
        error && <p className="text-red-500 text-center">{error}</p>
      }
    </div>
  );
}

export default Profile;
