import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal/Modal'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import back from '../assets/svgs/back.svg'
import { API_BASE } from '../middleware/API_BASE'

const UnitList = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const { departmentId } = useParams()
  const decodedID = String(atob(departmentId), 10)

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [units, setUnits] = useState([])
  const [unitForm, setUnitForm] = useState({
    unit: '',
    department_id: decodedID,
    description: '',
  })

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }

    axios
      .get(API_BASE + `unit_list?department_id=${decodedID}`, config)
      .then((res) => {
        setUnits(res.data.result)
      })
      .catch((err) => console.log(err))
  }, [decodedID])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUnitForm((prevDeptForm) => ({ ...prevDeptForm, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(docForm)
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
        API_BASE + 'create_unit',
        qs.stringify(unitForm),
        config
      )
      if (+response.data.status_code === 0) {
        toast.success(response.data.message)
        const updatedResponse = await axios.get(
          API_BASE + `unit_list?department_id=${decodedID}`,
          config
        )
        setUnits(updatedResponse.data.result)
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
    setUnits({
      unit: '',
      department_id: '',
      description: '',
    })
  }

  return (
    <div>
      <div>
        <div className="flex items-center justify-between w-full mb-5">
          <div className="flex items-center space-x-5">
            <img
              src={back}
              className="w-6 h-6 cursor-pointer hover:scale-125"
              alt=""
              onClick={goBack}
            />
            <h3 className="flex text-lg font-bold text-left">Units</h3>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="px-4 py-2 rounded bg-green"
              onClick={() => setShowModal(true)}
            >
              Create Unit
            </button>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 text-left gap-x-5 gap-y-5 ">
                  <div>
                    <label htmlFor="" className="text-xs font-semibold">
                      Unit:
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                      id="unit"
                      name="unit"
                      value={unitForm.unit}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="text-xs font-semibold">
                      Description:
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                      id="description"
                      name="description"
                      value={unitForm.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between w-full">
                  <button
                    type="submit"
                    className="px-4 py-3 mt-5 text-xs font-semibold rounded bg-green text-black_color"
                  >
                    Create Unit
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>

      {units.length > 0 ? (
        <ul className="flex flex-col gap-4 mb-6">
          {units.length > 0 &&
            units.map((unit) => (
              <li
                className="relative flex items-center justify-between font-semibold capitalize duration-300 ease-in-out rounded-sm group w-80 gap- text-dark_color"
                key={unit.unit_id}
              >
                {unit.unit}
              </li>
            ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center mt-40 sm:mt-60">
          <span className="font-semibold text-lg sm:text-[30px]">
            No Units Available
          </span>
        </div>
      )}
    </div>
  )
}

export default UnitList
