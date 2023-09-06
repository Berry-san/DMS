import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import uploadedFile from '../assets/svgs/uploadedFile.svg'
import back from '../assets/svgs/back.svg'

const UserDocument = () => {
  const [documents, setDocuments] = useState([])

  const { docOwner } = useParams()
  const decodedID = String(atob(docOwner), 10)
  console.log(decodedID)

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }

    axios
      .get(
        `http://161.35.56.41/cmd_system_api/v1/api/document_details?document_owner=${decodedID}`,
        config
      )
      .then((res) => {
        const apiData = res.data.result
        const dataWithId = apiData.map((item, index) => ({
          ...item,
          id: index + 1, // You can use a more appropriate logic to generate IDs
        }))
        console.log(dataWithId)
        setDocuments(dataWithId)
      })
      .catch((err) => console.log(err))
  }, [decodedID])

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
          <h3 className="flex text-lg font-bold text-left">{decodedID}</h3>
        </div>
      </div>
      {documents.length < 0 ? (
        <div>No User Document</div>
      ) : (
        <ul className="flex gap-4">
          {documents.map((doc) => {
            return (
              <div className="max-w-[8rem] text-center" key={doc.id}>
                <a
                  href={`http://161.35.56.41/cmd_system_api/assets/img/useraccount/${doc.image}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={uploadedFile} className="w-32 h-32" alt="" />
                  <p className="text-sm text-center truncate">{doc.image}</p>
                </a>
              </div>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default UserDocument
