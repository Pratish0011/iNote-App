import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/userSlice/userSlice";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const fileRef = useRef();
  const [edit, setEdit] = useState(true);
  const [formData, setFormData] = useState({});

  function handleChange() {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  function handleEdit(e){
   e.preventDefault()
   setEdit(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

        const data = await res.json()

        if(data.success === false){
          dispatch(updateUserFailure(data))
        }

        dispatch(updateUserSuccess(data))

    } catch (error) {
       dispatch(updateUserFailure(error.message))
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-myColor mt-10 rounded-lg p-4 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-8">
        <input ref={fileRef} hidden type="file" i />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="Photo"
          className="rounded-full cursor-pointer w-40 h-40"
        />
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
                loading? "Updating...": "Update"
              }
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
