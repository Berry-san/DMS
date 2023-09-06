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
  //   const navigate = useNavigate()
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
          'http://161.35.56.41/cmd_system_api/v1/api/user_login',
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

          const { email, firstname, lastname, user_type_id } = loginUser
          console.log(loginUser)
          dispatch(
            setUserData({
              email,
              firstname,
              lastname,
              isAuthenticated: response.data['status_code'] === '0',
              role: user_type_id,
            })
          )
          // dispatch({
          //   type: 'SET_USER',
          //   payload: {
          //     email,
          //     firstname,
          //     lastname,
          //     isAuthenticated: response.data['status_code'] === '0',
          //     role: user_type_id,
          //   },
          // })
          // console.log(state.isAuthenticated)
          toast.success(response.data.message)
          navigate('/layout')
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
                  <div>
                    <label htmlFor="" className="text-xs font-semibold">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                      id="password"
                      name="password"
                      value={loginValue.values.password}
                      onChange={loginValue.handleChange}
                      onBlur={loginValue.handleBlur}
                    />
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
