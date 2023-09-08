import { Link, useNavigate } from 'react-router-dom'
import loginLogo from '../../assets/images/loginLogo.svg'
import { useState } from 'react'
import axios from 'axios'
import qs from 'qs'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useGlobalStoreContext } from '../../context/main'
import ClipLoader from 'react-spinners/ClipLoader'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/userSlice'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const { state, dispatch } = useGlobalStoreContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const loginValue = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validationSchema: Yup.object({
    //   email: Yup.string().email('Invalid email address').required('Required'),
    //   password: Yup.string()
    //     .min(8, 'Password must be 8 characters long')
    //     .matches(/[0-9]/, 'Password requires a number')
    //     .matches(/[a-z]/, 'Password requires a lowercase letter')
    //     .matches(/[A-Z]/, 'Password requires an uppercase letter')
    //     .matches(/[^\w]/, 'Password requires a symbol'),
    // }),
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
          'https://connectapi.mosquepay.org/cmd_system_api/v1/api/user_login',
          qs.stringify(loginValue.values),
          config
        )
        console.log(response.data)
        if (response.data['status_code'] === '0') {
          const allUserDetails = response.data.user_details

          const loginUser = allUserDetails.find(
            (user) =>
              user.email.toLowerCase() === loginValue.values.email.toLowerCase()
          )

          const { email, firstname, lastname, user_type_id, created_by } =
            loginUser
          console.log(loginUser)
          dispatch(
            setUserData({
              email,
              firstname,
              lastname,
              isAuthenticated: response.data['status_code'] === '0',
              role: user_type_id,
              created_by,
            })
          )
          toast.success(response.data.message)
          navigate('/layout')
        } else {
          toast.error(response.data.message)
        }
        setLoading(false)
      } catch (error) {
        toast.error(error.message)
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
        <div className="bg-[#fff] text-dark_color border border-dull_white max-w-xl mx-auto rounded-md">
          <div className="flex items-end justify-start w-full px-10 py-6 bg-white border-b border-slate-400">
            <img src={loginLogo} alt="" />
          </div>
          <div className="px-10 py-6">
            <div className="flex items-center justify-between mb-5 ">
              <h4 className="text-sm font-semibold">Sign In</h4>
              <Link to="/signUp">
                <span className="text-xs font-semibold text-black_color">
                  User registration
                </span>
              </Link>
            </div>
            <div>
              <form onSubmit={loginValue.handleSubmit}>
                <div className="grid grid-cols-1 text-left md:grid-cols-2 gap-x-5 gap-y-5 ">
                  <div>
                    <label htmlFor="" className="text-xs font-semibold">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                      id="email"
                      name="email"
                      value={loginValue.values.email}
                      onChange={loginValue.handleChange}
                      onBlur={loginValue.handleBlur}
                    />
                    {loginValue.touched.email && loginValue.errors.email ? (
                      <p className="text-red-500 font-medium text-xs mt-1">
                        {loginValue.errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div className="relative">
                    <label htmlFor="" className="text-xs font-semibold">
                      Password:
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                        id="password"
                        name="password"
                        value={loginValue.values.password}
                        onChange={loginValue.handleChange}
                        onBlur={loginValue.handleBlur}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
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
                    </div>

                    {loginValue.touched.password &&
                    loginValue.errors.password ? (
                      <p className="text-red-500 font-medium text-xs mt-1">
                        {loginValue.errors.password}
                      </p>
                    ) : null}
                  </div>
                </div>
                <button
                  className="px-4 py-3 mt-5 text-xs font-semibold rounded bg-green text-black_color"
                  type="submit"
                  disabled={loading}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
