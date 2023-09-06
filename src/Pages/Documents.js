import folders from '../assets/svgs/folders.svg'
// import Search from '../components/Search/Search'
import playGif from '../assets/svgs/play.gif'
import back from '../assets/svgs/back.svg'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from '../components/Modal/Modal'
import { ToastContainer, toast } from 'react-toastify'
import qs from 'qs'

const Documents = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const [docType, setDocType] = useState([])
  const [docForm, setDocForm] = useState({
    document_type: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }

    axios
      .get(
        'http://161.35.56.41/cmd_system_api/v1/api/document_type_list',
        config
      )
      .then((res) => {
        setDocType(res.data.result)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setDocForm((prevDeptForm) => ({ ...prevDeptForm, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(docForm)
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
        'http://161.35.56.41/cmd_system_api/v1/api/create_document',
        qs.stringify(docForm),
        config
      )
      console.log(response)
      if (+response.data.status_code === 0) {
        toast.success(response.data.message)
        const updatedResponse = await axios.get(
          `http://161.35.56.41/cmd_system_api/v1/api/document_type_list`,
          config
        )
        setDocType(updatedResponse.data.result)
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
    setDocForm({
      document_type: '',
      description: '',
    })
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
          <h3 className="flex text-lg font-bold text-left">Document</h3>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <button
            className="px-4 py-2 rounded bg-green"
            onClick={() => setShowModal(true)}
          >
            Create Document Type
          </button>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 text-left gap-x-5 gap-y-5 ">
            <div>
              <label htmlFor="" className="text-xs font-semibold">
                Document Type:
              </label>
              <input
                type="text"
                className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                id="document_type"
                name="document_type"
                value={docForm.document_type}
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
                value={docForm.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <button
              type="submit"
              className="px-4 py-3 mt-5 text-xs font-semibold rounded bg-green text-black_color"
            >
              Create Type
            </button>
          </div>
        </form>
      </Modal>
      {docType.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {docType.map((type) => {
              const encodedValue = btoa(type.document_id.toString())
              // console.log(encodedValue)
              return (
                <Link
                  to={`/layout/documents/${encodedValue}`}
                  className="hover:scale-105"
                  key={type.document_id}
                >
                  <div className="flex-shrink py-8 text-center rounded bg-dull_white">
                    <img src={folders} className="mx-auto" alt="" />
                    <div className="text-dark_color text-sm pt-2 font-semibold tracking-[0.7px] truncate px-3">
                      {type.document_type}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-40 sm:mt-60">
          <span className="font-semibold text-lg sm:text-[30px]">
            No Documents Type Available
          </span>
        </div>
      )}
    </>
  )
}

export default Documents
