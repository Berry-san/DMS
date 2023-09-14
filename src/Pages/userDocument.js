import { useEffect, useState } from 'react'
import axios from 'axios'
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
import ShareButton from '../components/ShareButton/ShareButton'

const UserDocument = () => {
  const [documents, setDocuments] = useState([])
  // const [extension, setExtension] = useState([])

  const { docOwner } = useParams()
  const decodedID = String(atob(docOwner), 10)
  console.log(decodedID)

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
    // Add more extensions and image URLs as needed
  }

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }

    axios
      .get(API_BASE + `document_details?document_owner=${decodedID}`, config)
      .then((res) => {
        const apiData = res.data.result
        const dataWithId = apiData.map((item, index) => ({
          ...item,
          id: index + 1, // You can use a more appropriate logic to generate IDs
        }))
        setDocuments(dataWithId)
        // const fileExtensions = apiData.map((ext) => {
        //   return console.log(ext)
        // })
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
                  <ShareButton link={link} icon={ellipsis} />
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
    </>
  )
}

export default UserDocument
