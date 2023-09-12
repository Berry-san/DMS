/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import folders from '../assets/svgs/folders.svg'
import networking from '../assets/svgs/networking.svg'
import file from '../assets/svgs/file.svg'
import man from '../assets/svgs/man.svg'
import rightArrow from '../assets/svgs/rightArrow.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_BASE } from '../middleware/API_BASE'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [docOwners, setDocOwners] = useState('')
  const [documents, setDocuments] = useState('')
  const [departments, setDepartments] = useState('')
  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }
    // Fetch data from your API endpoint
    axios
      .get(API_BASE + 'document_counts_list', config)
      .then((res) => {
        setDocOwners(res.data.document_owner[0].doc_owner_count)
        setDepartments(res.data.department[0].dep_count)
        setDocuments(res.data.document[0].doc_count)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <div>
        <p className="pb-6 text-lg font-bold">System Overview.</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="overflow-hidden rounded-md">
            <div className="flex px-5 py-8 bg-green/50">
              <div>
                <img src={man} alt="" />
              </div>
              <div className="truncate ps-7">
                <p className="text-sm font-bold truncate">Document Owners</p>
                <p className="pt-1 text-sm font-medium text-black_color">
                  Count: {docOwners}
                </p>
              </div>
            </div>
            <Link to="documentOwners">
              <div className="flex justify-between p-5 text-xs text-white bg-black_color hover:scale-105">
                <span className="font-semibold">View all Users</span>
                <span>
                  <img src={rightArrow} alt="" />
                </span>
              </div>
            </Link>
          </div>
          <div className="overflow-hidden rounded-md">
            <div className="flex px-5 py-8 bg-green/50">
              <div>
                <img src={folders} alt="" />
              </div>
              <div className="truncate ps-7">
                <p className="text-sm font-bold truncate">Documents</p>
                <p className="pt-1 text-sm font-medium text-black_color">
                  Count: {documents}
                </p>
              </div>
            </div>
            <Link to="documents">
              <div className="flex justify-between p-5 text-xs text-white bg-black_color hover:scale-105">
                <span className="font-semibold">View all documents</span>
                <span>
                  <img src={rightArrow} alt="" />
                </span>
              </div>
            </Link>
          </div>
          <div className="overflow-hidden rounded-md">
            <div className="flex px-5 py-8 bg-green/50">
              <div>
                <img src={networking} alt="" />
              </div>
              <div className="truncate ps-7">
                <p className="text-sm font-bold truncate">Departments</p>
                <p className="pt-1 text-sm font-medium text-black_color">
                  Count: {departments}
                </p>
              </div>
            </div>
            <Link to="departments">
              <div className="flex justify-between p-5 text-xs text-white bg-black_color hover:scale-105">
                <span className="font-semibold">View all departments</span>
                <span>
                  <img src={rightArrow} alt="" />
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 pt-[40px]">
          <div className="flex col-span-7 px-5 rounded bg-green/50">
            <div className="flex-none hidden xl:block">
              <img className="" src={file} alt="" />
            </div>
            <div className="flex-grow py-8 text-center md:py-14 lg:py-14">
              <p className="text-sm font-bold">Upload a new document</p>
              <p className="font-semibold text-xs pt-2 tracking-[0.6px]">
                You'll need the name of the document owner, department, phone
                number and email address.
              </p>
              <Link to="uploadDocument">
                <button className="bg-black_color text-dull_white mt-7 px-4 py-2 rounded-md text-xs tracking-[0.6px] hover:bg-green hover:text-black hover:font-semibold">
                  Upload Document
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
