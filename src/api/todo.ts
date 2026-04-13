import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
 
export const TodoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://37.27.29.18:8001' }),
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => `/api/to-dos`,
    }),
    getTodoById: build.query({
      query: (id) => `/api/to-dos/${id}`,
    }),
    addTodo: build.mutation({
      query: (formData) => ({
        url: `/api/to-dos`,
        method: 'POST',
        body: formData,
      }),
    }),
    editTodo: build.mutation({
      query: ({ id, body }) => ({
        url: `/api/to-dos/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/api/to-dos?id=${id}`,
        method: 'DELETE',
      }),
    }),
    changeStatus: build.mutation({
      query: (id) => ({
        url: `/api/to-dos/completed?id=${id}`,
        method: 'PUT',
      }),
    }),
    addImage: build.mutation({
      query: ({ id, formData }) => ({
        url: `/api/to-dos/${id}/images`,
        method: 'POST',
        body: formData,
      }),
    }),
    deleteImage: build.mutation({
      query: (id) => ({
        url: `/api/to-dos/images/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})
 
export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useChangeStatusMutation,
  useAddImageMutation,
  useDeleteImageMutation,
} = TodoApi