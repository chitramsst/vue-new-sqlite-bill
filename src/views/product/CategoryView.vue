<template>
    <div class="flex flex-col space-y-5 w-full">
        <!-- header section  -->
        <div class="h-[7%]  shadow-sm  border-b-[0.5px] border-border flex flex-row justify-between p-5 items-center">
            <div class=" text-sm">
                <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[100%] outline-0"
                    placeholder="search category" />
            </div>
            <div class="flex flex-row space-x-5">
                <div class="flex flex-row space-x-2">
                    <p @click="openModal"
                        class=" text-white py-2 px-3 text-wrap  bg-primary rounded-lg flex items-center justify-center gap-3 text-sm">
                        <i class="fas fa-plus"></i> Create Category
                    </p>
                    <CategoryModal :isVisible="isModalVisible" @close="isModalVisible = false" title="Create Category"
                        :isEdit="false" />
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
                <div class="bg-slate-600 p-3 rounded-lg text-pretty text-center">
                    <h3> Category 1</h3>
                    <div class="border-b-[0.5px] border-border/30 mt-3 "></div>
                    <div class="flex justify-between item-center px-2 pt-3">
                        <div class="text-white">
                            <i class="fas fa-trash"></i>
                        </div>
                        <div class="text-cyan-500" @click="openEditModal">
                            <i class="fas fa-pencil"></i>
                        </div>
                    </div>
                    <CategoryModal :isVisible="isEditModalVisible" @close="isEditModalVisible = false"
                        title="Edit Category" :isEdit="true" />
                </div>
                <div class="bg-slate-600 p-3 rounded-lg text-pretty text-center">
                    <h3> Category 1</h3>
                    <div class="border-b-[0.5px] border-border/30 mt-3 "></div>
                    <div class="flex justify-between item-center px-2 pt-3">
                        <div class="text-white">
                            <i class="fas fa-trash"></i>
                        </div>
                        <div class="text-cyan-500">
                            <i class="fas fa-pencil"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-400 p-3 rounded-lg text-pretty text-center">
                    <h3> Category 1</h3>
                    <div class="border-b-[0.5px] border-border mt-3 "></div>
                    <div class="flex justify-between item-center px-2 pt-3">
                        <div class="text-white">
                            <i class="fas fa-trash"></i>
                        </div>
                        <div class="text-cyan-500">
                            <i class="fas fa-pencil"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-600 p-3 rounded-lg text-pretty text-center">
                    <h3> Category 1</h3>
                    <div class="border-b-[0.5px] border-border/30 mt-3 "></div>
                    <div class="flex justify-between item-center px-2 pt-3">
                        <div class="text-white">
                            <i class="fas fa-trash"></i>
                        </div>
                        <div class="text-cyan-500">
                            <i class="fas fa-pencil"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-600 p-3 rounded-lg text-pretty text-center">
                    <h3> Category 1</h3>
                    <div class="border-b-[0.5px] border-border/30 mt-3 "></div>
                    <div class="flex justify-between item-center px-2 pt-3">
                        <div class="text-white">
                            <i class="fas fa-trash"></i>
                        </div>
                        <div class="text-cyan-500">
                            <i class="fas fa-pencil"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-400 p-3 rounded-lg text-pretty text-center">
                    <h3> Category 1</h3>
                    <div class="border-b-[0.5px] border-border mt-3 "></div>
                    <div class="flex justify-between item-center px-2 pt-3">
                        <div class="text-white">
                            <i class="fas fa-trash"></i>
                        </div>
                        <div class="text-cyan-500">
                            <i class="fas fa-pencil"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';
import CategoryModal from '../../components/Modals/CategoryModal.vue'
export default {
    name: 'App',
    components: {
        CategoryModal,
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
};
</script>
