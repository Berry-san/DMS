import axios from 'axios'
import { toast } from 'react-toastify'
import qs from 'qs'
import { useNavigate } from 'react-router'
import back from '../assets/svgs/back.svg'
import { useState } from 'react'
import { useGlobalStoreContext } from '../context/main'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
const CreateUser = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const { email, firstname, lastname } = useSelector((state) => state.user.user)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const userValue = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      password: '',
      user_type_id: 3,
      create_by: email,
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(3, 'Must be more than three characters')
        .required('Required'),
      lastname: Yup.string()
        .min(3, 'Must be more than three characters')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      // phone_number: Yup.string().required('Provide a valid phone number'),
      password: Yup.string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
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

      try {
        const response = await axios.post(
          'http://161.35.56.41/cmd_system_api/v1/api/user_creation',
          qs.stringify(userValue.values),
          config
        )
        console.log(response)
        if (+response.data.status_code === 0) {
          toast.success(response.data.message)
          //   dispatch({
          //     type: 'SET_USER',
          //     payload: {
          //       email: '',
          //       firstName: '',
          //       isAuthenticated: false,
          //     },
          //   })
        } else {
          toast.error(response.data.message)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(error)
        setLoading(false)
      }

      console.log(loading)
    },
  })

  return (
    <div className="text-left">
      <div className="flex items-center mb-5 space-x-5">
        <img
          src={back}
          className="w-6 h-6 cursor-pointer"
          alt=""
          onClick={goBack}
        />
        <h3 className="flex text-lg font-bold text-left">Create User</h3>
      </div>
      <form onSubmit={userValue.handleSubmit}>
        <div className="grid grid-cols-1 text-left md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-5">
          <div>
            <label htmlFor="" className="text-xs font-semibold">
              First Name:
            </label>
            <input
              type="text"
              className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
              id="firstname"
              name="firstname"
              value={userValue.values.firstname}
              onChange={userValue.handleChange}
              onBlur={userValue.handleBlur}
            />
            {userValue.touched.firstname && userValue.errors.firstname ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {userValue.errors.firstname}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="" className="text-xs font-semibold">
              Last Name:
            </label>
            <input
              type="text"
              className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
              id="lastname"
              name="lastname"
              value={userValue.values.lastname}
              onChange={userValue.handleChange}
              onBlur={userValue.handleBlur}
            />
            {userValue.touched.lastname && userValue.errors.lastname ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {userValue.errors.lastname}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="" className="text-xs font-semibold">
              Phone Number:
            </label>
            <input
              type="tel"
              className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
              id="phonenumber"
              name="phonenumber"
              value={userValue.values.phonenumber}
              onChange={userValue.handleChange}
              onBlur={userValue.handleBlur}
            />
            {userValue.touched.phonenumber && userValue.errors.phonenumber ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {userValue.errors.phonenumber}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="" className="text-xs font-semibold">
              Email Address:
            </label>
            <input
              type="email"
              className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
              id="email"
              name="email"
              value={userValue.values.email}
              onChange={userValue.handleChange}
              onBlur={userValue.handleBlur}
            />
            {userValue.touched.email && userValue.errors.email ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {userValue.errors.email}
              </p>
            ) : null}
          </div>
          <div className="relative">
            <label htmlFor="" className="text-xs font-semibold">
              Password:
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
              id="password"
              name="password"
              value={userValue.values.password}
              onChange={userValue.handleChange}
              onBlur={userValue.handleBlur}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 top-6 flex items-center px-4 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
            {userValue.touched.password && userValue.errors.password ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {userValue.errors.password}
              </p>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-3 mt-5 text-xs font-semibold rounded bg-green text-black_color"
          disabled={loading}
        >
          {loading ? 'loading' : 'Create User'}
        </button>
      </form>
    </div>
  )
}

export default CreateUser
