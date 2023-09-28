import { describe, it } from 'vitest'
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Home from '../pages/index.vue'

describe('home.vue', () => {
  it('add todo', async () => {
    const wrapper = mount(Home)
    const newTodo = {
      title: `test@todo-${Date.now()}`,
      content: 'test@todo content'
    }
    await wrapper.vm.setTodo(newTodo)
    await wrapper.vm.addOrEditTodo()
    const isTodoAdded = wrapper.vm.todos.some(
      todo => todo.title === newTodo.title && todo.content === newTodo.content
    )
    expect(isTodoAdded).to.be.true
  })

  it('remove todo', async () => {
    const wrapper = mount(Home)
    const newTodo = {
      title: `test@todo-${Date.now()}`,
      content: 'test@todo content'
    }
    await wrapper.vm.setTodo(newTodo)
    await wrapper.vm.addOrEditTodo()
    const isTodoAdded = wrapper.vm.todos.some(
      todo => todo.title === newTodo.title && todo.content === newTodo.content
    )
    expect(isTodoAdded).to.be.true
    const addedTodo = wrapper.vm.todos.find(
      todo => todo.title === newTodo.title && todo.content === newTodo.content
    )
    if (addedTodo && addedTodo.id) {
      await wrapper.vm.removeTodo(addedTodo.id)
    }
    const isTodoRemoved = !wrapper.vm.todos.some(
      todo => todo.title === newTodo.title && todo.content === newTodo.content
    )
    expect(isTodoRemoved).to.be.true
  })

  it('mark todo as completed', async () => {
    const wrapper = mount(Home)
    const newTodo = {
      title: `test@todo-${Date.now()}`,
      content: 'test@todo content'
    }
    await wrapper.vm.setTodo(newTodo)
    await wrapper.vm.addOrEditTodo()
    const isTodoAdded = wrapper.vm.todos.some(
      todo => todo.title === newTodo.title && todo.content === newTodo.content
    )
    expect(isTodoAdded).to.be.true

    const addedTodo = wrapper.vm.todos.find(
      todo => todo.title === newTodo.title && todo.content === newTodo.content
    )
    if (addedTodo && addedTodo.id) {
      await wrapper.vm.completeTodo(addedTodo.id)
    }
    const isTodoCompleted = wrapper.vm.todos.some(
      todo =>
        todo.title === newTodo.title &&
        todo.content === newTodo.content &&
        todo.status
    )
    expect(isTodoCompleted).to.be.true
  })

  it('edit todo', async () => {
    const wrapper = mount(Home)
    const newTodo = {
      title: `test@todo-${Date.now()}`,
      content: 'test@todo content'
    }
    await wrapper.vm.setTodo(newTodo)
    await wrapper.vm.addOrEditTodo()
    const isTodoAdded = wrapper.vm.todos.some(
      todo => todo.title === newTodo.title && todo.content === newTodo.content
    )
    expect(isTodoAdded).to.be.true
    const addedTodo = wrapper.vm.todos.find(
      todo => todo.title === newTodo.title && todo.content === newTodo.content
    )
    const updatedTodo = {
      id: addedTodo.id,
      title: `updated@todo-${Date.now()}`,
      content: 'updated todo content'
    }
    await wrapper.vm.setTodo(updatedTodo)
    await wrapper.vm.setEditMode()
    await wrapper.vm.addOrEditTodo()
    const isTodoUpdated = wrapper.vm.todos.some(
      todo =>
        todo.id === addedTodo.id &&
        todo.title === updatedTodo.title &&
        todo.content === updatedTodo.content
    )
    expect(isTodoUpdated).to.be.true
  })
})
