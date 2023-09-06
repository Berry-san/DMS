/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginLogo from '../../assets/images/loginLogo.svg'
import { toast } from 'react-toastify'
import qs from 'qs'
import axios from 'axios'
// import { useGlobalStoreContext } from '../context/main'
// import axiosInstance from '../utils/axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ClipLoader from 'react-spinners/ClipLoader'

const SignUp = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const signUpValue = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      password: '',
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
      console.log(signUpValue.values)

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': 987654,
        },
      }

      try {
        const response = await axios.post(
          'http://161.35.56.41/cmd_system_api/v1/api/super_admin_account_creation',
          qs.stringify(signUpValue.values),
          config
        )
        console.log(response)
        if (response.data['status_code'] === '0') {
          toast.success(response.data.message)
          navigate('/login')
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
    <div className="flex items-center justify-center h-screen bg-dull_white">
      {loading ? (
        <ClipLoader
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="flex flex-col items-center justify-center bg-[#fff] text-dark_color border border-dull_white max-w-xl mx-auto rounded-md">
          <div className="flex items-end justify-start w-full px-10 py-6 bg-white border-b border-slate-400">
            <img src={loginLogo} alt="" />
          </div>
          <div className="px-10 py-6">
            <div className="flex items-center justify-between mb-5 ">
              <h4 className="text-sm font-semibold text-dark_color">
                User Registration
              </h4>
              <Link to="/login">
                <span className="text-xs font-semibold text-black_color">
                  Sign In
                </span>
              </Link>
            </div>
            <div>
              <form onSubmit={signUpValue.handleSubmit}>
                <div className="grid grid-cols-1 text-left md:grid-cols-2 gap-x-5 gap-y-5 ">
                  <div>
                    <label htmlFor="" className="text-xs font-semibold">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                      id="firstname"
                      name="firstname"
                      value={signUpValue.values.firstname}
                      onChange={signUpValue.handleChange}
                      onBlur={signUpValue.handleBlur}
                    />
                    {signUpValue.touched.firstname &&
                    signUpValue.errors.firstname ? (
                      <p className="text-red-500 font-medium text-xs mt-1">
                        {signUpValue.errors.firstname}
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
                      value={signUpValue.values.lastname}
                      onChange={signUpValue.handleChange}
                      onBlur={signUpValue.handleBlur}
                    />
                    {signUpValue.touched.lastname &&
                    signUpValue.errors.lastname ? (
                      <p className="text-red-500 font-medium text-xs mt-1">
                        {signUpValue.errors.lastname}
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
                      value={signUpValue.values.phonenumber}
                      onChange={signUpValue.handleChange}
                      onBlur={signUpValue.handleBlur}
                    />
                    {signUpValue.touched.phonenumber &&
                    signUpValue.errors.phonenumber ? (
                      <p className="text-red-500 font-medium text-xs mt-1">
                        {signUpValue.errors.phonenumber}
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
                      value={signUpValue.values.email}
                      onChange={signUpValue.handleChange}
                      onBlur={signUpValue.handleBlur}
                    />
                    {signUpValue.touched.email && signUpValue.errors.email ? (
                      <p className="text-red-500 font-medium text-xs mt-1">
                        {signUpValue.errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="" className="text-xs font-semibold">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                      id="password"
                      name="password"
                      value={signUpValue.values.password}
                      onChange={signUpValue.handleChange}
                      onBlur={signUpValue.handleBlur}
                    />
                    {signUpValue.touched.password &&
                    signUpValue.errors.password ? (
                      <p className="text-red-500 font-medium text-xs mt-1">
                        {signUpValue.errors.password}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full">
                  <button
                    type="submit"
                    className="px-4 py-3 mt-5 text-xs font-semibold rounded bg-green text-black_color"
                  >
                    Register
                  </button>
                  <span className="text-xs font-semibold text-black_color">
                    Forgot Password?
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUp
