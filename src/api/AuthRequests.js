import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://clean-pantyhose-duck.cyclic.app/'
  });

export const login=(formData)=>instance.post('/api/auth/login',formData)
export const register=(formData)=>instance.post('/api/auth/register',formData)
export const getUser = ()=>instance.get('/api/tableData/getTableData')