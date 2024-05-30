<template>
    <div class="flex flex-col space-y-5 w-full">
        <!-- header section  -->
        <div class="h-[7%]  shadow-sm  border-b-[0.5px] border-border flex flex-row justify-between p-5 items-center">
            <div class=" text-sm">
                <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[100%] outline-0"
                    placeholder="search unit" v-model="search" />
            </div>
            <div class="flex flex-row space-x-5">
                <div class="flex flex-row space-x-2">
                    <p @click="openModal"
                        class=" text-white py-2 px-3 text-wrap  bg-primary rounded-lg flex items-center justify-center gap-3 text-sm">
                        <i class="fas fa-plus"></i> Create Unit
                    </p>

                    <div class="border-l border-border h-7 mt-1 "></div>
                    <p
                        class="text-gray-800 py-2 px-3 text-wrap  border-[0.5px] border-border  rounded-lg flex items-center justify-center gap-3 text-sm font-semibold">
                        <i class="fas fa-backward"></i>
                    </p>
                </div>
            </div>
        </div>
        <!--End of header section  -->



        <div class="h-[90%] w-full">

            <div class="container mx-auto px-4 sm:px-8">
                <div class="py-8">
                    <div>
                        <h2 class="text-2xl font-semibold leading-tight">Units</h2>
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            class="px-5 py-3 border-b-2 border-slate-200 bg-slate-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-slate-200 bg-slate-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                           Full Name
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-slate-200 bg-slate-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th class="px-5 py-3 border-b-2 border-slate-200 bg-slate-100"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in itemResults" :key="item.id">
                                        <td class="px-5 py-5 border-b border-slate-200 bg-white text-sm">
                                            <div class="flex">
                                                <div class="ml-3">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {{ item.dataValues.name }}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-5 py-5 border-b border-slate-200 bg-white text-sm">
                                            <div class="flex">
                                                <div class="ml-3">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {{ item.dataValues.full_name }}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-5 py-5 border-b border-slate-200 bg-white text-sm">
                                            <span
                                                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight" v-if="item.dataValues.is_active==1">
                                                <span aria-hidden
                                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span class="relative">Active</span>
                                            </span>
                                            <span
                                                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight" v-if="item.dataValues.is_active==0">
                                                <span aria-hidden
                                                    class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                                <span class="relative">InActive</span>
                                            </span>
                                        </td>
                                        <td class="px-5 py-5 border-b border-slate-200 bg-white text-sm text-right ">
                                            <div class="flex item-center px-2 pt-3 space-x-10 justify-end">
                                                <div class="text-cyan-500" @click="editItemInitiate(item)">
                                                    <i class="fas fa-pencil"></i>
                                                </div>
                                                <div class="text-red-500">
                                                    <i class="fas fa-trash" @click="deleteItem(item)"></i>
                                                </div>
                                            </div>
                                            <UnitModal :isVisible="isEditModalVisible"
                                                @close="isEditModalVisible = false" title="Edit Unit" :isEdit="true" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <UnitModal :isVisible="isModalVisible" @close="isModalVisible = false" title="Create Unit" :isEdit="false"
        @save="handleUpdates" />
    <UnitModal :isVisible="isEditModalVisible" @close="isEditModalVisible = false" ref="editmodal" title="Edit Unit"
        :isEdit="true" @save="handleUpdates" />
</template>



<script lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ref } from 'vue';
import UnitModal from '../../components/Modals/UnitModal.vue'

export default {
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            authStore: useAuthStore(),
            error: false,
            items: [],
            search: ''
        }
    },
    components: {
        UnitModal,
    },
    mounted() {
        this.getItems()
    },
    setup() {
        const isModalVisible = ref(false);
        const isEditModalVisible = ref(false);

        const openModal = () => {
            isModalVisible.value = true;
        };

        const openEditModal = () => {
            isEditModalVisible.value = true;
        };

        return {
            isModalVisible,
            isEditModalVisible,
            openModal,
            openEditModal
        };
    },
    methods: {
        async getItems() {
            window.ipcRenderer.invoke('database-function', { target: 'get-units' }).then((response) => {
                if (response.success == false) {
                    this.error = true;
                }
                else {
                    this.items = response.items
                }
            })
        },
        /* set the item for edit */
        editItemInitiate(item) {
            (this.$refs.editmodal as any).editItem(item)
            this.isEditModalVisible = true
        },

        handleUpdates(e) {
            if (e.type == 'create') {
                this.items.unshift(e.item)
            }
            else if (e.type == 'update') {
                let index = this.items.findIndex((x, index) => x.dataValues.id == e.item.dataValues.id);
                if (index != -1) {
                    this.items[index] = e.item
                }
            }
        },

        deleteItem(item) {
            this.$emitter.emit('show-delete-modal', {
                message: 'Do you want to delete selected unit?',
                title: 'Confirm Delete',
                btnText: 'Delete',
                callback: (e: 'CONFIRM' | 'CLOSE') => {
                    if (e == 'CONFIRM') {
                        window.ipcRenderer.invoke('database-function', {
                            target: 'delete-unit',
                            data: {
                                item_id: item.dataValues.id
                            }
                        }).then((response) => {
                            // if(response.success == false)
                            // {
                            //     this.$emitter.emit('notify',{
                            //         title : 'Delete Failed',
                            //         subtitle : this.$t('Expense Unit cannot be deleted as its used in a expense.'),
                            //         type : 'error'
                            //     })
                            //     return;
                            // }
                            let index = this.items.findIndex((x, index) => x.dataValues.id == item.dataValues.id);
                            this.items.splice(index, 1)
                            // this.$emitter.emit('notify', {
                            //     title: 'Delete Success',
                            //     subtitle: 'Unit has been deleted',
                            //     type: 'success'
                            // })
                        });
                    }
                }
            })
        },
    },
    computed: {
        itemResults() {
            return this.items.filter((x) => x.dataValues.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
        }
    }
}
</script>