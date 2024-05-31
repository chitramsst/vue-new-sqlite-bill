<template>
    <div class="flex flex-col space-y-5 w-full">
        <!-- header section  -->
        <div class="h-[7%]  shadow-sm  border-b-[0.5px] border-border flex flex-row justify-between p-5 items-center">
            <div class=" text-sm">
                <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[100%] outline-0"
                    placeholder="search supplier" />
            </div>
            <div class="flex flex-row space-x-5">
                <div class="flex flex-row space-x-2">
                    <router-link to="/supplier/create">
                        <p
                            class=" text-white py-2 px-3 text-wrap  bg-primary rounded-lg flex items-center justify-center gap-3 text-sm">
                            <i class="fas fa-plus"></i> Create Supplier
                        </p>
                    </router-link>
                    <div class="border-l border-border h-7 mt-1 "></div>
                    <p
                        class="text-gray-800 py-2 px-3 text-wrap  border-[0.5px] border-border  rounded-lg flex items-center justify-center gap-3 text-sm font-semibold">
                        <i class="fas fa-backward"></i>
                    </p>
                </div>
            </div>
        </div>
        <!--End of header section  -->
        <div class="h-[90%] w-full p-10">

            <div class="container mx-auto px-4 sm:px-8">
                <div class="py-8">
                    <div>
                        <h2 class="text-2xl font-semibold leading-tight">Suppliers</h2>
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
                                            Unit
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-slate-200 bg-slate-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-slate-200 bg-slate-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-slate-200 bg-slate-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Expiry
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-slate-200 bg-slate-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th class="px-5 py-3 border-b-2 border-slate-200 bg-slate-100"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="px-5 py-5 border-b border-slate-200 bg-white text-sm">
                                            <div class="flex">
                                                <div class="flex-shrink-0 w-10 h-10">
                                                    <img class="w-full h-full rounded-full"
                                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                        alt="" />
                                                </div>
                                                <div class="ml-3">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        Molly Sanders
                                                    </p>
                                                    <p class="text-gray-600 whitespace-no-wrap">000004</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-5 py-5 border-b border-slate-200 bg-white text-sm"></td>
                                        <td class="px-5 py-5 border-b border-slate-200 bg-white text-sm">
                                            <p class="text-gray-900 whitespace-no-wrap">$20,000</p>
                                            <p class="text-gray-600 whitespace-no-wrap">USD</p>
                                        </td>
                                        <td class="px-5 py-5 border-b border-slate-200 bg-white text-sm">
                                        </td>
                                        <td class="px-5 py-5 border-b border-slate-200 bg-white text-sm">
                                            <p class="text-gray-900 whitespace-no-wrap">Sept 28, 2019</p>
                                            <p class="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
                                        </td>
                                        <td class="px-5 py-5 border-b border-slate-200 bg-white text-sm">
                                            <span
                                                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden
                                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span class="relative">Active</span>
                                            </span>
                                        </td>
                                        <td class="px-5 py-5 border-b border-slate-200 bg-white text-sm text-right ">
                                            <div class="flex item-center px-2 pt-3 space-x-10 justify-end">
                                                <div class="text-yellow-500">
                                                    <i class="fas fa-eye"></i>
                                                </div>
                                                <div class="text-cyan-500">
                                                    <i class="fas fa-pencil"></i>
                                                </div>
                                                <div class="text-red-500">
                                                    <i class="fas fa-trash"></i>
                                                </div>
                                            </div>
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
</template>


<script lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { ref } from 'vue';

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
            window.ipcRenderer.invoke('database-function', { target: 'get-suppliers' }).then((response) => {
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
            // this.$nextTick(() => {
            //     this.$refs.editmodal.editItem(item);
            // });

            // (this.$refs.editmodal as any).editItem(item)

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
                message: 'Do you want to delete selected category?',
                title: 'Confirm Delete',
                btnText: 'Delete',
                callback: (e: 'CONFIRM' | 'CLOSE') => {
                    if (e == 'CONFIRM') {
                        window.ipcRenderer.invoke('database-function', {
                            target: 'delete-category',
                            data: {
                                item_id: item.dataValues.id
                            }
                        }).then((response) => {
                            // if(response.success == false)
                            // {
                            //     this.$emitter.emit('notify',{
                            //         title : 'Delete Failed',
                            //         subtitle : this.$t('Expense Category cannot be deleted as its used in a expense.'),
                            //         type : 'error'
                            //     })
                            //     return;
                            // }
                            let index = this.items.findIndex((x, index) => x.dataValues.id == item.dataValues.id);
                            this.items.splice(index, 1)
                            // this.$emitter.emit('notify', {
                            //     title: 'Delete Success',
                            //     subtitle: 'Category has been deleted',
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