<template>
  <div class="w-full container max-w-5xl mx-auto px-4">
    <div>
      <div class="p-2 flex justify-center">
        <h3 class="text-2xl">Add Todo</h3>
      </div>
      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label class="block text-sm font-medium leading-6 text-gray-900">
            Title
          </label>
          <div class="mt-2">
            <div
              class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md"
            >
              <input
                v-model="todo.title"
                type="text"
                class="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Enter Title"
              />
            </div>
          </div>
        </div>
        <div class="col-span-full">
          <label class="block text-sm font-medium leading-6 text-gray-900">
            Content
          </label>
          <div class="mt-2">
            <textarea
              v-model="todo.content"
              rows="3"
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
        <div v-if="error" class="col-span-full flex">
          <span class="text-red-500">{{ error }}</span>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-start gap-x-6">
        <button
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="addOrEditTodo"
        >
          Save
        </button>
      </div>
    </div>
    <div>
      <div class="p-2 flex justify-center">
        <h3 class="text-2xl">Todo List</h3>
      </div>
      <div
        class="py-5 flex items-center justify-center font-sans overflow-hidden"
      >
        <table class="table-auto w-full">
          <thead
            class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
          >
            <tr>
              <th class="p-2 whitespace-nowrap">
                <div class="font-semibold text-center">Title</div>
              </th>
              <th class="p-2 whitespace-nowrap">
                <div class="font-semibold text-center">Content</div>
              </th>
              <th class="p-2 whitespace-nowrap">
                <div class="font-semibold text-center">Status</div>
              </th>
              <th class="p-2 whitespace-nowrap">
                <div class="font-semibold text-center">Action</div>
              </th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-gray-100">
            <template v-if="!!(todos || []).length">
              <tr v-for="todo in todos" :key="todo.id">
                <td class="p-2 whitespace-nowrap">
                  <div class="text-md text-center text-gray-800">
                    {{ todo.title }}
                  </div>
                </td>
                <td class="p-2 whitespace-nowrap">
                  <div class="text-md text-center text-gray-800">
                    {{ truncate(todo.content) }}
                  </div>
                </td>
                <td class="p-2 whitespace-nowrap">
                  <div class="text-md text-center text-gray-800">
                    {{ todo.status ? "Completed" : "Pending" }}
                  </div>
                </td>
                <td class="p-2 justify-center" style="display: flex">
                  <div class="p-1">
                    <button
                      type="button"
                      class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      :disabled="todo.status"
                      :class="{ 'disabled:opacity-50': todo.status }"
                      @click="editTodo(todo.id)"
                    >
                      Edit
                    </button>
                  </div>
                  <div class="p-1">
                    <button
                      class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                      :disabled="todo.status"
                      :class="{ 'disabled:opacity-50': todo.status }"
                      @click="completeTodo(todo.id)"
                    >
                      Complete
                    </button>
                  </div>
                  <div class="p-1">
                    <button
                      class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      @click="removeTodo(todo.id)"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";
export default {
  name: "Home",
  setup() {
    const editMode = ref(false);
    const todo = ref({
      title: "",
      content: "",
    });

    const todos = ref([]);
    const error = ref("");
    const defErrMsg = ref("");

    function setTodo(newTodo) {
      todo.value = newTodo;
    }

    function setEditMode() {
      editMode.value = true;
    }

    function clearError() {
      error.value = "";
      defErrMsg.value = "";
    }

    function setError(e) {
      error.value = e?.response?.data?.message || e?.message || defErrMsg.value;
    }

    function truncate(text, length = 60) {
      return text.length > length ? text.substring(0, length) + "..." : text;
    }

    async function completeTodo(id) {
      try {
        clearError();
        const result = await axios.patch(`/api/todo/${id}`);
        todos.value = result.data;
      } catch (e) {
        error.value = "Error completing task.";
      }
    }

    async function removeTodo(id) {
      try {
        clearError();
        const result = await axios.delete(`/api/todo/${id}`);
        todos.value = result.data;
      } catch (e) {
        defErrMsg.value = "Error removing task";
        setError(e);
      }
    }

    function editTodo(id) {
      clearError();
      editMode.value = true;
      todo.value = { ...todos.value.find((todo) => todo.id === id) };
    }

    async function addOrEditTodo() {
      try {
        clearError();
        if (todo.value.title && todo.value.content) {
          let result;
          if (editMode.value) {
            result = await axios.put(`/api/todo/${todo.value.id}`, todo.value);
          } else {
            result = await axios.post("/api/todo", todo.value);
          }
          todos.value = result.data;
          todo.value = {
            title: "",
            content: "",
          };
          editMode.value = false;
        }
      } catch (e) {
        defErrMsg.value = "Something went wrong in adding/updating todo";
        setError(e);
      }
    }

    onMounted(async () => {
      try {
        clearError();
        const result = await axios.get("/api/todo");
        todos.value = result.data;
      } catch (error) {
        error.value = "Error loading tasks.";
      }
    });

    return {
      todo,
      todos,
      truncate,
      removeTodo,
      completeTodo,
      addOrEditTodo,
      editTodo,
      error,
      setTodo,
      setEditMode,
    };
  },
};
</script>
