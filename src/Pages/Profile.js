import axios from 'axios'
import { toast } from 'react-toastify'
import qs from 'qs'
import { useNavigate } from 'react-router'
import back from '../assets/svgs/back.svg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { API_BASE } from '../middleware/API_BASE'
import ClipLoader from 'react-spinners/ClipLoader'

const Profile = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { firstname, lastname, role, email, phonenumber, department, unit } =
    useSelector((state) => state.user.user)

  const passwordValue = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async () => {
      setLoading(true)
      setError(null)

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': 987654,
        },
      }

      // console.log(passwordValue.values)
      console.log({
        old_passwnew: passwordValue.values.oldPassword,
        new_password: passwordValue.values.newPassword,
        email,
        user_type_id: role,
      })

      try {
        const response = await axios.post(
          API_BASE + 'update_pass',
          qs.stringify({
            old_password: passwordValue.values.oldPassword,
            new_password: passwordValue.values.newPassword,
            email,
            user_type_id: role,
          }),
          config
        )
        console.log(response)
        if (response.data['status_code'] === '0') {
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
        setLoading(false)
      } catch (err) {
        toast.error(err.message)
        setError(error)
        setLoading(false)
        console.log(error)
      }
    },
  })
  return (
    <div>
      <div className="flex items-center mb-5 space-x-5">
        <img
          src={back}
          className="w-6 h-6 cursor-pointer"
          alt=""
          onClick={goBack}
        />
        <h3 className="flex text-lg font-bold text-left">Profile</h3>
      </div>
      <div className="text-dark_color">
        <div className="flex items-center justify-start my-10 space-x-5">
          <div className="text-dark_color bg-dull_white text-4xl font-semibold px-7 py-8 rounded-full tracking-[0.7px]">
            {firstname?.charAt(0)}
            {lastname?.charAt(0)}
          </div>
          <div className="">
            <p className="text-sm font-semibold tracking-[0.7px]">
              {firstname} {lastname}
            </p>
            <p className="text-sm font-medium text-black_color">{email}</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="font-bold text-dark_color">PERSONAL INFORMATION</h2>
            <div className="grid grid-cols-1 text-left md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-5">
              <div>
                <label htmlFor="" className="text-sm font-semibold">
                  First Name:
                </label>
                <p className="bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md">
                  {firstname}
                </p>
              </div>
              <div>
                <label htmlFor="" className="text-sm font-semibold">
                  Last Name:
                </label>
                <p className=" bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md">
                  {lastname}
                </p>
              </div>
              {department ? (
                <div>
                  <label htmlFor="" className="text-sm font-semibold">
                    Department
                  </label>
                  <p className=" bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md">
                    {department}
                  </p>
                </div>
              ) : null}
              {unit ? (
                <div>
                  <label htmlFor="" className="text-sm font-semibold">
                    Unit
                  </label>
                  <p className="w-1/4 bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md">
                    {firstname}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <h2 className="font-bold ">CONTACT INFORMATION</h2>
            <div className="grid grid-cols-1 text-left md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-5">
              <div>
                <label htmlFor="" className="text-sm font-semibold">
                  Email Address:
                </label>
                <p className="bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md">
                  {email}
                </p>
              </div>
              <div>
                <label htmlFor="" className="text-sm font-semibold">
                  Phone Number:
                </label>
                <p className="bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md">
                  {phonenumber}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold">CHANGE PASSWORD</h2>
            <div>
              <form onSubmit={passwordValue.handleSubmit}>
                <div className="grid grid-cols-1 text-left md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-5">
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-sm font-semibold">
                      Current Password:
                    </label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwordValue.values.oldPassword}
                      onChange={passwordValue.handleChange}
                      onBlur={passwordValue.handleBlur}
                      placeholder="Enter Current Password"
                      className="bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                    />
                    {passwordValue.touched.oldPassword &&
                    passwordValue.errors.oldPassword ? (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {passwordValue.errors.oldPassword}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-sm font-semibold">
                      New Password:
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordValue.values.newPassword}
                      onChange={passwordValue.handleChange}
                      onBlur={passwordValue.handleBlur}
                      placeholder="Enter New Password"
                      className="bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                    />
                    {passwordValue.touched.newPassword &&
                    passwordValue.errors.newPassword ? (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {passwordValue.errors.newPassword}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-sm font-semibold">
                      Confirm New Password:
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordValue.values.confirmPassword}
                      onChange={passwordValue.handleChange}
                      onBlur={passwordValue.handleBlur}
                      placeholder="Confirm New Password"
                      className="bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                    />
                    {passwordValue.touched.confirmPassword &&
                    passwordValue.errors.confirmPassword ? (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {passwordValue.errors.confirmPassword}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex justify-center mt-5 md:justify-start">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center w-48 px-4 py-2 font-semibold text-center text-black rounded bg-green"
                  >
                    {loading ? (
                      <ClipLoader
                        loading={loading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
