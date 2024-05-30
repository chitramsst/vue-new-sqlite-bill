<template>
    <div class="flex flex-col space-y-5 w-full">
        <!-- header section  -->
        <div class="h-[7%]  shadow-sm  border-b-[0.5px] border-border flex flex-row justify-between p-5 items-center">
            <div class=" text-sm">
                <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[100%] outline-0"
                    placeholder="search category" v-model="search" />
            </div>
            <div class="flex flex-row space-x-5">
                <div class="flex flex-row space-x-2">
                    <p @click="openModal"
                        class=" text-white py-2 px-3 text-wrap  bg-primary rounded-lg flex items-center justify-center gap-3 text-sm">
                        <i class="fas fa-plus"></i> Create Category
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
        <div class="h-[90%] w-full p-10">
            <div>
                <h2 class="text-2xl font-semibold leading-tight mt-10">Categories</h2>
            </div>
            <div class="grid grid-cols-5 gap-10  text-gray-300 mt-10">
                <div class=" p-3 rounded-lg text-pretty text-center"
                    :class="item.dataValues.is_active == 1 ? 'bg-slate-600' : 'bg-slate-400'"
                    v-for="item in itemResults" :key="item.id">
                    <h3>{{ item.dataValues.name }}</h3>
                    <div class="border-b-[0.5px] border-border/30 mt-3 "></div>
                    <div class="flex justify-between item-center px-2 pt-3">
                        <div class="text-white" @click="deleteItem(item)">
                            <i class="fas fa-trash"></i>
                        </div>
                        <div class="text-cyan-500" @click="editItemInitiate(item)">
                            <i class="fas fa-pencil"></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <CategoryModal :isVisible="isModalVisible" @close="isModalVisible = false" title="Create Category" :isEdit="false"
        @save="handleUpdates" />
    <CategoryModal :isVisible="isEditModalVisible" @close="isEditModalVisible = false" ref="editmodal"
        title="Edit Category" :isEdit="true" @save="handleUpdates" />
</template>



<script lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { ref } from 'vue';
import CategoryModal from '../../components/Modals/CategoryModal.vue'

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
        CategoryModal,
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
            window.ipcRenderer.invoke('database-function', { target: 'get-categories' }).then((response) => {
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