<template>
    <div class="flex flex-col gap-10 w-full p-3 md:p-4 pb-10">
        <h1 class="font-medium py-2 border-b-2 w-full">Update task {{ task.id }}</h1>
        <div class="flex flex-col gap-4" v-if="task">
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
                <date-picker :value="$moment(task.dueDate).toDate()" @input="task.dueDate = $event" type="date"
                    format="YYYY-MM-DD" placeholder="Due date" class="w-full"></date-picker>
            </div>
            <div class="flex w-full flex-row-reverse">
                <div @click="updateTask"
                    class="cursor-pointer rounded text-white text-sm bg-[#03A9F4] px-8 py-2 mt-10 shadow w-4/12 text-center">
                    Update </div>
            </div>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    name: 'update-task-form',
    components: { DatePicker },
    props: ['taskInfo'],
    data() {
        let task = this.taskInfo
        return {
            task: task
        }
    },
    methods: {

        updateTask() {
            const _id = this.task['id']
            this.$SERVICES.AsyncUpdate(this.task, `/tasks/${_id}`).then(result => {

                if (result.status === 200) {
                    this.$toast.success(`Task ${result.data.label} was updated with success`, {
                        position: "top-center",
                        timeout: 5000,
                    });
                    this.$emit('updateTask', result.data)
                } else {
                    this.$toast.error(`error updating task ${result.data.label}`, {
                        position: "top-center",
                        timeout: 5000,
                    })
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