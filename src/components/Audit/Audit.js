import { API_BASE } from '../../middleware/API_BASE'
import axios from 'axios'
import qs from 'qs'

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-api-key': 987654,
  },
}

const Audit = {
  // Function to log an audit trail entry
  logAuditTrail: async (entry) => {
    try {
      const response = await axios.post(
        API_BASE + 'create_user_views',
        qs.stringify(entry),
        config
      )
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    console.log(entry)
  },

  // Rest of the functions (getAuditTrail and clearAuditTrail) remain the same
  // ...
}

export default Audit
