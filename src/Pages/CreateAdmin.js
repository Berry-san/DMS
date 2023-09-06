import axios from 'axios'
import { toast } from 'react-toastify'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import back from '../assets/svgs/back.svg'
import { useState } from 'react'
import { useGlobalStoreContext } from '../context/main'
import { useFormik } from 'formik'
import * as Yup from 'yup'
const CreateAdmin = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const { state, dispatch } = useGlobalStoreContext()
  const { email } = state.user

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const adminValue = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      password: '',
      user_type_id: 2,
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
          'http://161.35.56.41/cmd_system_api/v1/api/super_admin_account_creation',
          qs.stringify(adminValue.values),
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
        <h3 className="flex text-lg font-bold text-left">Create Admin</h3>
      </div>
      <form onSubmit={adminValue.handleSubmit}>
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
              value={adminValue.values.firstname}
              onChange={adminValue.handleChange}
              onBlur={adminValue.handleBlur}
            />
            {adminValue.touched.firstname && adminValue.errors.firstname ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {adminValue.errors.firstname}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="" className="text-xs font-semibold">
              Full Name:
            </label>
            <input
              type="text"
              className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
              id="lastname"
              name="lastname"
              value={adminValue.values.lastname}
              onChange={adminValue.handleChange}
              onBlur={adminValue.handleBlur}
            />
            {adminValue.touched.lastname && adminValue.errors.lastname ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {adminValue.errors.lastname}
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
              value={adminValue.values.phonenumber}
              onChange={adminValue.handleChange}
              onBlur={adminValue.handleBlur}
            />
            {adminValue.touched.phonenumber && adminValue.errors.phonenumber ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {adminValue.errors.phonenumber}
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
              value={adminValue.values.email}
              onChange={adminValue.handleChange}
              onBlur={adminValue.handleBlur}
            />
            {adminValue.touched.email && adminValue.errors.email ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {adminValue.errors.email}
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
              value={adminValue.values.password}
              onChange={adminValue.handleChange}
              onBlur={adminValue.handleBlur}
            />
            {adminValue.touched.password && adminValue.errors.password ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {adminValue.errors.password}
              </p>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-3 mt-5 text-xs font-semibold rounded bg-green text-black_color"
          disabled={loading}
        >
          {loading ? 'loading' : 'Create Admin'}
        </button>
      </form>
    </div>
  )
}

export default CreateAdmin
