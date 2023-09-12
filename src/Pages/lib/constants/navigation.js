import user from '../../../assets/svgs/user.svg'
import users from '../../../assets/svgs/users.svg'
import upload from '../../../assets/svgs/upload.svg'
import documents from '../../../assets/svgs/documents.svg'
import departments from '../../../assets/svgs/departments.svg'
import dashboard from '../../../assets/svgs/dashboard.svg'

export const SUPERADMIN_SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: './',
    icon: dashboard,
  },
  {
    key: 'createUser',
    label: 'Create User',
    path: 'createUser',
    icon: user,
  },
  {
    key: 'createAdmin',
    label: 'Create Admin',
    path: 'createAdmin',
    icon: user,
  },
  {
    key: 'uploadDocument',
    label: 'Upload Document',
    path: 'uploadDocument',
    icon: upload,
  },
  {
    key: 'documentOwners',
    label: 'Document Owners',
    path: 'documentOwners',
    icon: users,
  },
  {
    key: 'departments',
    label: 'Departments',
    path: 'departments',
    icon: departments,
  },
  {
    key: 'documents',
    label: 'Documents',
    path: 'documents',
    icon: documents,
  },
  {
    key: 'profile',
    label: 'Profile',
    path: 'profile',
    icon: user,
  },
]

export const ADMIN_SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: './',
    icon: dashboard,
  },
  {
    key: 'createUser',
    label: 'Create User',
    path: 'createUser',
    icon: user,
  },
  {
    key: 'uploadDocument',
    label: 'Upload Document',
    path: 'uploadDocument',
    icon: upload,
  },
  {
    key: 'documentOwners',
    label: 'Document Owners',
    path: 'documentOwners',
    icon: users,
  },
  {
    key: 'documents',
    label: 'Documents',
    path: 'documents',
    icon: documents,
  },
  {
    key: 'profile',
    label: 'Profile',
    path: 'profile',
    icon: user,
  },
]

export const USER_SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: './',
    icon: dashboard,
  },
  {
    key: 'uploadDocument',
    label: 'Upload Document',
    path: 'uploadDocument',
    icon: upload,
  },
  {
    key: 'documents',
    label: 'Documents',
    path: 'documents',
    icon: documents,
  },
  {
    key: 'profile',
    label: 'Profile',
    path: 'profile',
    icon: user,
  },
]

export const DEPARTMENT_LINKS = [
  {
    key: 'sales',
    label: 'Sales',
    path: 'sales',
  },
  {
    key: 'marketing',
    label: 'Marketing',
    path: 'marketing',
  },
  {
    key: 'technical',
    label: 'Technical',
    path: 'technical',
  },
  {
    key: 'product',
    label: 'Product',
    path: 'product',
  },
  {
    key: 'finance',
    label: 'Finance',
    path: 'finance',
  },
  {
    key: 'welfare',
    label: 'Welfare',
    path: 'welfare',
  },
]
