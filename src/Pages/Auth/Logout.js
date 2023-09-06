// components/Logout.js
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { clearUserData } from '../../redux/userSlice'

function Logout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    dispatch(clearUserData())
    toast.error('Logout Successful')
    sessionStorage.clear()
    navigate('/login')
  }

  return <button onClick={handleClick}>Logout</button>
}

export default Logout
