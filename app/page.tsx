"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Input, Modal } from 'antd'
import './globals.css'

let api = "http://37.27.29.18:8001/api/to-dos"
let apiImages = "http://37.27.29.18:8001/images"

const Home=()=> {
  const [Users, setUsers] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState("")
  const [editDesc, setEditDesc] = useState("")
  const [search,setSearch]=useState("")

  async function get() {
    try {
      let { data } = await axios.get(api)
      setUsers(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    get()
  }, [])

  async function addnewUser(event) {
    event.preventDefault()
    let addForm = new FormData()
    addForm.append("Name", event.target["inpName"].value)
    addForm.append("Description", event.target["inpDesc"].value)
    let file = event.target["inpImg"].files
    for (let i = 0; i < file.length; i++) addForm.append("Images", file[i])
    try {
      await axios.post(api, addForm)
      get()
      setOpenAdd(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(`${api}?id=${id}`)
      get()
    } catch (error) {
      console.error(error)
    }
  }

  async function editUser(event) {
    event.preventDefault()
    try {
      await axios.put(`${api}`, { Name: editName, Description: editDesc,id:editId })
      get()
      setEditOpen(false)
    } catch (error) {
      console.error(error)
    }
  }





  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className='text-3xl font-bold mt-10'>User</h1>
      <nav className='flex gap-5 m-10'>
        <Button type="primary" onClick={() => setOpenAdd(true)}>AddUser</Button>
      </nav>
      <div className="grid grid-cols-2 gap-5 p-5">
        {Users.map(e => (
          <div key={e.id} className='p-5 shadow flex flex-col gap-2 items-center'>
            <h1>{e.name}</h1>
            <h1>{e.description}</h1>
            <h1 className={e.isCompleted ? "text-green-500" : "text-red-500"}>{e.isCompleted ? "Active" : "Inactive"}</h1>
            <div className="flex gap-2">
              {e.images.map(img => (
                <div key={img.id}>
                  <img className='w-40 h-40 object-cover' src={`${apiImages}/${img.imageName}`} />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => deleteUser(e.id)}>Delete</Button>
              <Button onClick={() => { setEditId(e.id); setEditName(e.name); setEditDesc(e.description); setEditOpen(true) }}>Edit</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal title="Add User" open={openAdd} onCancel={() => setOpenAdd(false)} footer={null}>
        <form onSubmit={addnewUser} className='flex flex-col gap-2'>
          <Input name='inpName' placeholder='Name...' />
          <Input name='inpDesc' placeholder='Description...' />
          <input multiple name='inpImg' type='file' />
          <button type='submit'>Save</button>
        </form>
      </Modal>

      <Modal title="Edit User" open={editOpen} onCancel={() => setEditOpen(false)} footer={null}>
        <form onSubmit={editUser} className='flex flex-col gap-2'>
          <Input name='editName' value={editName} onChange={(e) => setEditName(e.target.value)} />
          <Input name='editDesc' value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
          <button type='submit'>Update</button>
        </form>
      </Modal>
    </div>
  )
}
export default Home




