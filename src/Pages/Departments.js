import { useEffect, useState } from 'react'
import right from '../assets/svgs/right.svg'
import back from '../assets/svgs/back.svg'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal/Modal'
import { toast } from 'react-toastify'
import qs from 'qs'
import axios from 'axios'
import { API_BASE } from '../middleware/API_BASE'

const Departments = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [department, setDepartment] = useState([])
  const [deptForm, setDeptForm] = useState({
    department: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setDeptForm((prevDeptForm) => ({ ...prevDeptForm, [name]: value }))
  }

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }

    axios
      .get(API_BASE + 'department', config)
      .then((res) => {
        setDepartment(res.data.result)
      })
      .catch((err) => console.log(err))
  }, [])
  console.log(department)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(deptForm)
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
        API_BASE + 'create_department',
        qs.stringify(deptForm),
        config
      )
      console.log(response)
      if (+response.data.status_code === 0) {
        toast.success(response.data.message)
        const updatedResponse = await axios.get(API_BASE + 'department', config)
        setDepartment(updatedResponse.data.result)
      } else {
        toast.error(response.data.message)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setError(error)
      setLoading(false)
      toast.error(error.message)
    }

    setShowModal(false)
    setDeptForm({
      department: '',
      description: '',
    })
  }
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-5">
          <img
            src={back}
            className="w-6 h-6 cursor-pointer hover:scale-125"
            alt=""
            onClick={goBack}
          />
          <h3 className="flex text-lg font-bold text-left">Department</h3>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <button
            className="px-4 py-2 rounded bg-green text"
            onClick={() => setShowModal(true)}
          >
            Create Department
          </button>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 text-left gap-x-5 gap-y-5 ">
            <div>
              <label htmlFor="" className="text-xs font-semibold">
                Department:
              </label>
              <input
                type="text"
                className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                id="department"
                name="department"
                value={deptForm.department}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="" className="text-xs font-semibold">
                Department Description:
              </label>
              <input
                type="text"
                className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                id="description"
                name="description"
                value={deptForm.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-3 mt-5 text-xs font-semibold rounded bg-green text-black_color"
            >
              Create Department
            </button>
          </div>
        </form>
      </Modal>
      {department.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {department.map((dept) => {
            const encodedValue = btoa(dept.department_id.toString())
            return (
              <Link
                to={`/layout/departments/${encodedValue}`}
                key={dept.department_id}
                className="group relative w-80 flex items-center justify-between gap-2.5 font-semibold rounded-md py-3 px-5  text-dark_color duration-300 ease-in-out"
              >
                <p className="font-semibold capitalize">{dept.department}</p>
                <img
                  src={right}
                  className="w-5 h-5 bg-dull_white"
                  alt="right"
                />
              </Link>
            )
          })}
        </ul>
      ) : (
        <div className="flex items-center justify-center mt-40 sm:mt-60">
          <span className="font-semibold text-lg sm:text-[30px]">
            No Departments Available
          </span>
        </div>
      )}
    </>
  )
}

export default Departments
