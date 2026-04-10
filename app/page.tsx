"use client"
import { useState } from "react"
import { Button, Input, Modal } from "antd"
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useChangeStatusMutation,
  useAddImageMutation,
  useDeleteImageMutation,
  useGetTodoByIdQuery,
} from "@/src/api/todo"

const apiImages = "http://37.27.29.18:8001/images"

const Home=()=> {
  const { data, refetch } = useGetTodosQuery(null)

  const [addTodo] = useAddTodoMutation()
  const [editTodo] = useEditTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const [changeStatus] = useChangeStatusMutation()
  const [addImage] = useAddImageMutation()
  const [deleteImage] = useDeleteImageMutation()

  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState([])

  // Add modal
  const [openAdd, setOpenAdd] = useState(false)

  // Edit modal
  const [openEdit, setOpenEdit] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState("")
  const [editDesc, setEditDesc] = useState("")

  // Info modal
  const [openInfo, setOpenInfo] = useState(false)
  const [infoId, setInfoId] = useState(null)
  const { data: infoData } = useGetTodoByIdQuery(infoId, { skip: !infoId })
  const infoUser = infoData?.data

  // Add image modal
  const [openAddImage, setOpenAddImage] = useState(false)
  const [imageTargetId, setImageTargetId] = useState(null)

  async function handleAdd(e) {
    e.preventDefault()
    const form = new FormData()
    form.append("Name", e.target["inpName"].value)
    form.append("Description", e.target["inpDesc"].value)
    const files = e.target["inpImg"].files
    for (let i = 0; i < files.length; i++) {
      form.append("Images", files[i])
    }
    await addTodo(form)
    refetch()
    setOpenAdd(false)
  }

  async function handleEdit(e) {
    e.preventDefault()
    await editTodo({ id: editId, body: { Name: editName, Description: editDesc } })
    refetch()
    setOpenEdit(false)
  }

  async function handleDelete(id) {
    await deleteTodo(id)
    refetch()
  }

  async function handleDeleteSelected() {
    for (const id of selectedIds) {
      await deleteTodo(id)
    }
    setSelectedIds([])
    refetch()
  }

  async function handleChangeStatus(id) {
    await changeStatus(id)
    refetch()
  }

  async function handleAddImage(e) {
    e.preventDefault()
    const form = new FormData()
    const files = e.target["inpAddImage"].files
    for (let i = 0; i < files.length; i++) {
      form.append("Images", files[i])
    }
    await addImage({ id: imageTargetId, formData: form })
    refetch()
    setOpenAddImage(false)
  }

  async function handleDeleteImage(id) {
    await deleteImage(id)
    refetch()
  }

  const todos = data?.data ?? []
  const filtered = todos.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="flex flex-col items-center text-black">
        <h1 className="text-3xl font-bold mt-10">Todos</h1>

        <nav className="flex justify-evenly items-center gap-10 m-10">
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded"
          />
          <Button type="primary" onClick={() => setOpenAdd(true)}>Add Todo</Button>
          <Button danger onClick={handleDeleteSelected}>Delete Selected</Button>
        </nav>
        <table className="w-[80%]">
  <thead className="h-15">
    <tr className="border-2">
      <th>Select</th>
      <th>Name</th>
      <th>Description</th>
      <th>Status</th>
      <th>Images</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody className="border-2 ">
    {filtered.map((todo) => (
      <tr key={todo.id} className="border-2 h-10 text-center">
        <td>
          <input
            type="checkbox"
            checked={selectedIds.includes(todo.id)}
            onChange={() => {
              setSelectedIds((prev) =>
                prev.includes(todo.id)
                  ? prev.filter((id) => id !== todo.id)
                  : [...prev, todo.id]
              )
            }}
          />
        </td>
        <td>{todo.name}</td>
        <td>{todo.description}</td>
        <td>
          <input
            type="checkbox"
            checked={!!todo.isCompleted}
            onChange={() => handleChangeStatus(todo.id)}
          />
        </td>
        <td>
          {todo.images?.map((img) => (
            <div key={img.id}>
              <img src={`${apiImages}/${img.imageName}`} className="h-13 rounded-full w-13" />
              <button onClick={() => handleDeleteImage(img.id)}>Delete image</button>
            </div>
          ))}
        </td>
        <td>
          <button onClick={() => { setImageTargetId(todo.id); setOpenAddImage(true) }}>Add Image</button>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
          <button onClick={() => { setEditId(todo.id); setEditName(todo.name); setEditDesc(todo.description); setOpenEdit(true) }}>Edit</button>
          <button onClick={() => { setInfoId(todo.id); setOpenInfo(true) }}>Info</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
 </div>

      {/* Add Modal */}
      <Modal title="Add Todo" open={openAdd} onCancel={() => setOpenAdd(false)} footer={null}>
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <Input name="inpName" placeholder="Name..." />
          <Input name="inpDesc" placeholder="Description..." />
          <input multiple name="inpImg" type="file" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal title="Edit Todo" open={openEdit} onCancel={() => setOpenEdit(false)} footer={null}>
        <form onSubmit={handleEdit} className="flex flex-col gap-4">
          <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Name..." />
          <Input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} placeholder="Description..." />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
        </form>
      </Modal>

      {/* Add Image Modal */}
      <Modal title="Add Image" open={openAddImage} onCancel={() => setOpenAddImage(false)} footer={null}>
        <form onSubmit={handleAddImage} className="flex flex-col gap-4">
          <input multiple name="inpAddImage" type="file" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Upload</button>
        </form>
      </Modal>

      {/* Info Modal */}
      <Modal title="Todo Info" open={openInfo} onCancel={() => { setOpenInfo(false); setInfoId(null) }} footer={null}>
        <h2 className="text-lg font-semibold">{infoUser?.name}</h2>
        <p>{infoUser?.description}</p>
        <div className="flex gap-3 flex-wrap mt-3">
          {infoUser?.images?.map((img, i) => (
            <img key={i} src={`${apiImages}/${img.imageName}`} alt="" className="w-40 h-40 object-cover rounded" />
          ))}
        </div>
      </Modal>
    </>
  )
}
export default Home