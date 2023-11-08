import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import uploadedFile from '../assets/svgs/uploadedFile.svg'
import back from '../assets/svgs/back.svg'
import pdf from '../assets/svgs/pdf.svg'
import ppt from '../assets/svgs/ppt.svg'
import png from '../assets/svgs/png.svg'
import xls from '../assets/svgs/xls.svg'
import doc from '../assets/svgs/doc.svg'
import ellipsis from '../assets/svgs/ellipsis.svg'
import { API_BASE } from '../middleware/API_BASE'
import UserAction from '../components/UserAction/UserAction'
import Modal from '../components/Modal/Modal'
import Audit from '../components/Audit/Audit'
import axios from 'axios'
import qs from 'qs'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UserDocument = () => {
  const [documents, setDocuments] = useState([])

  const [loading, setLoading] = useState(false)
  const [tableHeader, setTableHeader] = useState()
  const [showModal, setShowModal] = useState(false)
  const [fileToDelete, setFileToDelete] = useState(null)

  const { create_by, email } = useParams()
  const decodedID = String(atob(create_by), 10)
  const decodedEmail = String(atob(email), 10)

  const extensionToImage = {
    pdf: pdf,
    xls: xls,
    xlsx: xls,
    png: png,
    jpg: png,
    doc: doc,
    docx: doc,
    ppt: ppt,
    pptx: ppt,
  }

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }

    axios
      .get(
        API_BASE +
          `docu_ment_details?create_by=${decodedID}&email=${decodedEmail}`,
        config
      )
      .then((res) => {
        const apiData = res.data.result
        const dataWithId = apiData.map((item, index) => ({
          ...item,
          id: index + 1,
        }))
        setDocuments(dataWithId)
        if (apiData.length > 0) setTableHeader(apiData[0].document_owner)
      })
      .catch((err) => console.log(err))
  }, [decodedEmail, decodedID])

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const openDeleteModal = (doc) => {
    console.log(doc)
    setFileToDelete(doc)
    setShowModal(true)
  }

  const closeDeleteModal = () => {
    setShowModal(false)
    setFileToDelete(null)
  }

  const logAuditTrail = (action, url, email) => {
    // Create an audit trail entry
    const auditTrailEntry = {
      inserted_dt: new Date().toISOString(), // Current date and time
      ref_id: decodedID,
      action,
      document_name: fileToDelete.image,
      email,
      url,
    }

    // Log the audit trail entry
    Audit.logAuditTrail(auditTrailEntry)
  }

  const handleDelete = async (file) => {
    // console.log(file)
    // const link = `https://connectapi.mosquepay.org/cmd_system_api/assets/img/useraccount/${file.image}`
    // logAuditTrail('Deleted Document', link, decodedEmail)
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }
    try {
      setLoading(true)
      const dataToDelete = {
        image: file.image,
      }

      const response = await axios.post(
        API_BASE + 'deleteImage',
        qs.stringify(dataToDelete),
        config
      )

      console.log(response)
      if (response.status === 200) {
        // After successful deletion, update the UI to reflect the deletion
        const updatedData = documents.filter((doc) => doc.id !== file.id)
        setDocuments(updatedData)
        const link = `https://connectapi.mosquepay.org/cmd_system_api/assets/img/useraccount/${file.image}`
        logAuditTrail('Deleted Document', link, decodedEmail)
        // Close the modal after deletion
        closeDeleteModal()
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
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
          <h3 className="flex text-lg font-bold text-left">{tableHeader}</h3>
        </div>
      </div>
      {documents.length < 0 ? (
        <div>No User Document</div>
      ) : (
        <ul className="grid grid-cols-3 gap-4 md:grid-cols-4 xl:grid-cols-6">
          {documents.map((doc) => {
            const link = `https://connectapi.mosquepay.org/cmd_system_api/assets/img/useraccount/${doc.image}`
            const extension = doc.image.split('.').pop().toLowerCase()
            const imageUrl = extensionToImage[extension] || uploadedFile
            // const encodedLink = encodeURIComponent(link)
            return (
              <div
                className="max-w-[10rem] text-center relative flex flex-col gap-4"
                key={doc.id}
              >
                <div className="absolute top-0 right-0">
                  <UserAction
                    link={link}
                    icon={ellipsis}
                    openDeleteModal={() => openDeleteModal(doc)}
                  />
                </div>
                <a
                  className="items-center justify-center mt-5"
                  download={true}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={imageUrl} className="w-32 h-32 mx-auto" alt="" />
                  <p className="text-sm text-center truncate">{doc.image}</p>
                </a>
              </div>
            )
          })}
        </ul>
      )}
      <Modal isVisible={showModal} onClose={closeDeleteModal}>
        <h2 className="mb-5 font-semibold text-center">
          Are you sure you want to delete this file?
        </h2>
        <div className="flex justify-center space-x-2">
          <button
            className="px-4 py-2 text-white rounded cursor-pointer bg-rose-600"
            onClick={() => handleDelete(fileToDelete)}
            disabled={loading}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 text-white cursor-pointer bg-blue-600 rounded"
            onClick={closeDeleteModal}
          >
            No
          </button>
        </div>
      </Modal>
    </>
  )
}

export default UserDocument
