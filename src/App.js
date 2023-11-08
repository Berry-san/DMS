import './App.css'
import Login from './Pages/Auth/login'
import SignUp from './Pages/Auth/SignUp'
import Layout from './Pages/global/Layout'
import Dashboard from './Pages/Dashboard'
import CreateSuperAdmin from './Pages/CreateSuperAdmin'
import CreateUser from './Pages/CreateUser'
import CreateAdmin from './Pages/CreateAdmin'
import DocumentOwners from './Pages/DocumentOwners'
import UserDocument from './Pages/userDocument'
import UploadDocument from './Pages/UploadDocument'
import Departments from './Pages/Departments'
import UnitList from './Pages/Units'
import Documents from './Pages/Documents'
import DocumentType from './Pages/DocumentType'
import Profile from './Pages/Profile'
import Token from './Pages/Auth/Token'
import ForgotPassword from './Pages/Auth/forgotPassword'
import AuditTrail from './Pages/AuditTrail'
import { Route, Navigate, Routes } from 'react-router'
import { useSelector } from 'react-redux'
import DocumentTrail from './Pages/DocumentTrail'

function App() {
  const { isAuthenticated } = useSelector((state) => state.user.user)

  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={
          isAuthenticated ? <Navigate replace to="/layout" /> : <Login />
        }
      />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/ResetPassword" element={<Token />} />
      <Route path="/forgotPassword/:token" element={<ForgotPassword />} />

      <Route path="/layout" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="createSuperAdmin" element={<CreateSuperAdmin />} />
        <Route path="createUser" element={<CreateUser />} />
        <Route path="createAdmin" element={<CreateAdmin />} />
        <Route path="documentOwners" element={<DocumentOwners />} />
        <Route path="auditTrail" element={<AuditTrail />} />
        <Route
          path="documentOwners/:create_by/:email"
          element={<UserDocument />}
        />
        <Route path="uploadDocument" element={<UploadDocument />} />
        <Route path="departments" element={<Departments />} />
        <Route path="departments/:departmentId" element={<UnitList />} />
        <Route path="documents" element={<Documents />} />
        <Route path="documents/:documentId" element={<DocumentType />} />
        <Route
          path="documents/:documentId/:docName"
          element={<DocumentTrail />}
        />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route index element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
