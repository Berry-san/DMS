// import React from 'react'
// An account verification link was sent to sanusiu111@gmail.com
// You can close this page and resume your account recovery from this link.
import { useNavigate } from 'react-router-dom'
import loginLogo from '../../assets/images/loginLogo.svg'
import { useState } from 'react'
import { API_BASE } from '../../middleware/API_BASE'
import axios from 'axios'
import qs from 'qs'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ClipLoader from 'react-spinners/ClipLoader'
import { useFormik } from 'formik'
import * as Yup from 'yup'
const ResetPassword = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const changePasswordValue = useFormik({
    initialValues: {
      email: '',
      user_type_id: '',
    },
    onSubmit: async () => {
      setLoading(true)
      setError(null)
      console.log(changePasswordValue.values)
      // setSuccess(true)

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': 987654,
        },
      }

      try {
        const response = await axios.post(
          API_BASE + 'generate_token',
          qs.stringify(changePasswordValue.values),
          config
        )
        console.log(response.data)
        if (response.data['status_code'] === '0') {
          toast.success(response.data.message)
          setSuccess(true)
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
    },
  })

  return (
    <div className="flex items-center justify-center h-screen bg-dull_white">
      <div className="bg-[#fff] text-dark_color border border-dull_white max-w-xl mx-auto rounded-md">
        <div className="flex items-end justify-start w-full px-10 py-6 bg-white border-b border-slate-400">
          <img src={loginLogo} alt="" />
        </div>
        <div className="px-10 py-6">
          {success ? (
            <div className="grid gap-5">
              <span>
                An account verification link was sent to {''}
                <span className="font-bold">
                  {changePasswordValue.values.email}
                </span>
              </span>
              <span>
                You can close this page and resume your account recovery from
                the sent link.
              </span>
            </div>
          ) : (
            <div>
              <form onSubmit={changePasswordValue.handleSubmit}>
                <div className="grid text-left">
                  <div>
                    <label htmlFor="" className="text-xs font-semibold">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                      id="email"
                      name="email"
                      value={changePasswordValue.values.email}
                      onChange={changePasswordValue.handleChange}
                      onBlur={changePasswordValue.handleBlur}
                    />
                    {changePasswordValue.touched.email &&
                    changePasswordValue.errors.email ? (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {changePasswordValue.errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="" className="text-xs font-semibold">
                      Select User Type
                    </label>
                    <select
                      value={changePasswordValue.values.department_id}
                      name="user_type_id"
                      onChange={changePasswordValue.handleChange}
                      className="rounded text-sm font-semibold tracking-[0.6px] text-black_color bg-dull_white w-full p-3 focus:bg-white focus:outline-black_color"
                    >
                      <option value="">--</option>
                      <option value="4">Super Super Admin</option>
                      <option value="1">Super Admin</option>
                      <option value="2">Admin</option>
                      <option value="3">User</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="w-40 px-4 py-3 mt-5 text-xs font-semibold rounded bg-green text-black_color"
                    disabled={loading}
                  >
                    {loading ? (
                      <ClipLoader
                        loading={loading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      'Send Mail'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
