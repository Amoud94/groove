<template>
  <div class="w-full flex flex-col items-center justify-center gap-10 p-5">

    <div class="mx-auto flex flex-col gap-4 w-full md:w-11/12 w-full">
      <div class="flex flex-row-reverse justify-between items-start">
        <div class="px-4 py-2 rounded border text-sm hover:bg-gray-100 cursor-pointer" @click="showAddNewModal">
          Add a new task
        </div>
      </div>
      <table class="w-full">
        <thead>
          <tr class="text-center border-b-2">
            <th scope="col" class="font-light py-5">ID</th>
            <th scope="col" class="font-light py-5">Label</th>
            <th scope="col" class="font-light py-5">Due Date</th>
            <th scope="col" class="font-light py-5">Action</th>

          </tr>
        </thead>

        <tbody class="text-[#354665] px-2 text-xs md:text-sm">
          <tr class="text-center border-b" v-for="(task, index) in tasks" :key="index">
            <td class="font-medium py-5">
              {{ task.id }}
            </td>
            <td class="font-medium py-5">
              {{ task.label }}
            </td>
            <td class="font-medium py-5 text-center">
              {{ task.dueDate | date('YYYY-MM-DD') }}
            </td>
            <td class="font-medium py-5 text-center">
              <div class="flex items-center justify-center gap-2 md:gap-5">
                <span class="cursor-pointer hover:text-[#03A9F4]" @click="showUpdateModal(task)">
                  <IcnSvg name="edit" class="h-4 w-4 md:w-6 md:h-6 fill-current" />
                </span>
                <span class="cursor-pointer hover:text-red-500" @click="showDeleteModal(task)">
                  <IcnSvg name="bin" class="h-4 w-4 md:w-6 md:h-6 fill-current" />
                </span>

              </div>
            </td>
          </tr>
          <tr v-if="this.tasks.length == 0" class="divide-y">
            <td colspan="7">
              <EmptyState> Aucun enregistrement n'a été ajouté pour le moment. </EmptyState>
            </td>
          </tr>
        </tbody>


      </table>

      <pop-up :active="showAddPopUp" size="lg" @update:active="showAddPopUp = false">
        <template v-slot:content>
          <div class="bg-white rounded p-2 md:p-8 text-[#354665] flex flex-col gap-10">
            <addTaskFormVue @addTask="handleAddEvent" />
          </div>
        </template>
      </pop-up>

      <pop-up :active="showUpdatePopUp" size="lg" @update:active="showUpdatePopUp = false">
        <template v-slot:content>
          <div class="bg-white rounded p-2 md:p-8 text-[#354665] flex flex-col gap-10">
            <updateTaskFormVue :taskInfo="selectedTask" @updateTask="handleUpdateEvent" />
          </div>
        </template>
      </pop-up>

      <pop-up :active="showDeletePopUp" size="md" @update:active="showDeletePopUp = false">
        <template v-slot:content>
          <div class="bg-white rounded-md p-5 whitespace-nowrap text-base">
            <div class="text-[#E05260] p-4 text-lg font-medium text-center">
              Are you sure of deleting this task
            </div>
            <div class="text-sm flex flex-row items-center justify-center border-b border-b-2 border-[#E05260] gap-5 py-5">
              <div class="p-3 rounded-md  bg-[#E05260] text-white text-center cursor-pointer" @click="deleteTask">
                Yes, i confirme
              </div>
              <div class="p-3 rounded-md  bg-gray-200 text-center text-black cursor-pointer" @click="showDeletePopUp = false">
                Non, cancel
              </div>

            </div>
          </div>
        </template>
      </pop-up>
    </div>
  </div>
</template>

<script>
import addTaskFormVue from "@/components/addTaskForm.vue";
import updateTaskFormVue from "@/components/updateTaskForm.vue";

export default {
  name: 'tasks-ui',
  components: { addTaskFormVue, updateTaskFormVue },
  data() {
    return {
      tasks: [],
      showAddPopUp: false,
      showDeletePopUp: false,
      showUpdatePopUp: false,
      selectedTask: null
    }
  },
  created() {
    this.fetch()
  },
  methods: {

    showDeleteModal(task) {
      this.showDeletePopUp = true
      this.selectedTask = JSON.parse(JSON.stringify(task))
    },

    showUpdateModal(task) {
      this.showUpdatePopUp = true
      this.selectedTask = JSON.parse(JSON.stringify(task))
    },

    handleUpdateEvent(payload) {
      console.log(payload)
      let index = this.tasks.findIndex(el => el.id == payload.id)
      if (index !== -1) {
        this.tasks[index] = payload
      }
      this.showUpdatePopUp = false
    },

    showAddNewModal() {
      this.showAddPopUp = true
    },

    handleAddEvent(payload) {
      this.tasks.push(payload)
      this.showAddPopUp = false
    },

    deleteTask() {

      this.$SERVICES.AsyncDelete(`/tasks/${this.selectedTask.id}`).then(result => {
        if (result.status === 200) {
          let index = this.tasks.findIndex(el => el.id == this.selectedTask.id)
          if (index !== -1) {
            this.tasks.splice(index, 1)
            this.showDeletePopUp = false
            this.$toast.success(`Task deleted with success`, {
              position: "top-center",
              timeout: 5000,
            });
          }
        } else {
          this.$toast.error(`error deleting task`, {
            position: "top-center",
            timeout: 5000,
          });
        }
      }).catch(error => {
        console.log(error)
        this.$toast.error(error, {
          position: "top-center",
          timeout: 5000,
        });
      })

    },
    fetch() {
      this.$SERVICES.AsyncGet(`/tasks`).then(result => {
        console.log(result)
        if (result.status === 200) {
          this.tasks = result.data
        } else {
          this.$toast.error(`error fatching tasks`, {
            position: "top-center",
            timeout: 5000,
          });
        }
      }).catch(error => {
        console.log(error)
        this.$toast.error(error, {
          position: "top-center",
          timeout: 5000,
        });
      })
    }
  }
}
</script>

<style scoped></style>
