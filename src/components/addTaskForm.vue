<template>
    <div class="flex flex-col gap-10 w-full p-3 md:p-4 pb-10">
        <h1 class="font-medium py-2 border-b-2 w-full">Add a new Task</h1>
        <div class="flex flex-col gap-4">
            <div class="w-full">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Label</label>
                <input type="text" v-model="task.label"
                    class="w-full p-2 border border-gray-300 text-gray-900 text-sm rounded-lg">
            </div>
            <div class="w-full">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                <textarea type="text" v-model="task.description"
                    class="w-full mt-0 px-2 py-2 text-sm text-gray-600 rounded border border-gray-300 min-h-[15rem]"></textarea>
            </div>
            <div class="w-full">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Due date</label>
                <date-picker v-model="task.dueDate" type="timestamp" format="YYYY-MM-DD" placeholder="Due date"
                    class="w-full"></date-picker>
            </div>
            <div class="flex w-full flex-row-reverse">
                <div @click="addNewTask"
                    class="cursor-pointer rounded text-white text-sm bg-[#03A9F4] px-8 py-2 mt-10 shadow w-4/12 text-center">
                    Confirm </div>
            </div>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    name: 'add-task-form',
    components: { DatePicker },
    props: ['addEvent'],
    data() {
        return {
            task: {
                dueDate: null,
                label: null,
                description: null,
                id: null
            }
        }
    },
    methods: {
        addNewTask() {
            this.$SERVICES.AsyncPost(this.task, `/tasks`).then(result => {
                if (result.status === 201) {
                    this.$toast.success(`Task ${result.data.label} created with success`, {
                        position: "top-center",
                        timeout: 5000,
                    });
                    this.$emit('addTask', result.data)
                } else {
                    this.$toast.error('error creation /tasks', {
                        position: "top-center",
                        timeout: 5000,
                    });
                }
            }).catch(error => {
                console.log(error)
                this.$toast.error(error, {
                    position: "top-center",
                    timeout: 5000,
                })
            })
        }
    }
}
</script>