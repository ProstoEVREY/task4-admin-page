import {$authHost, $host} from "./index";
import jwtDecode from 'jwt-decode'

export const registration = async (email, password, username) =>{
    const {data} =  await $host.post('register', {email, password, username, status:"ACTIVE"})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const login = async (email, password) =>{
    const {data} = await $host.post('login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const check = async () =>{
    const {data} = await $authHost.get('auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const deleteUser = async (id) => {
    const {data} = await $authHost.delete('users',{params:{id}})
    return data
}
export const blockUser = async (id) => {
    const {data} = await $authHost.put('users',null,{params:{id}})
    console.log(data)
    return data
}
export const getUsers = async () => {
    const {data} =  await $authHost.get('users')
    return data.users
}