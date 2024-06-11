<template>
    <A4 v-if="cartItems && cartData && authStore.settings?.printer_type != 2" 
    :cartItems = "cartItems"
    :cartData = 'cartData'
    :auth-store="authStore"
    :moment="moment"
     ></A4>
    <Thermal v-else-if="cartItems && cartData" 
    :cartItems = "cartItems"
    :cartData = 'cartData'
    :auth-store="authStore"
    :moment="moment"
     ></Thermal>
</template>


<script>
import A4 from './PrintLayout/A4.vue';
import Thermal from './PrintLayout/Thermal.vue';

export default {
    props: {
        cartItems: [],
        cartData: {},
        authStore: {},
        moment: {},
        download : {
            default : false
        }
    },
    data() {
        return {
            invoice: null,
            invoiceDetails : []
        };
    },
    mounted() {
      // this.getSaleData(this.id);
      this.goPrint();
    },
    methods: {
        goPrint() {
            let settings = {}
                            window.ipcRenderer.invoke("print-window", { cartItems: JSON.stringify(this.cartItems),cartData : this.cartData}).then((response) => {
                            });
        },
        getSaleData(id) {
            window.ipcRenderer.invoke('database-function', {
                    target: 'invoice-features',
                    data: {
                        type: 'read-invoice',
                        invoice_id: this.id,
                    }
                }).then((response) => {
                    console.log(response)
                    this.invoiceDetails = response.invoiceDetails
                    this.invoice = response.invoice;
                    this.$nextTick(() => {
                        setTimeout(() => {
                            let data = this.$el.outerHTML;
                            // if(this.download)
                            // {
                            //     window.ipcRenderer.invoke('download-report', { data: data}).then((response) => {
                            //     })
                            //     return;
                            // }
                             let settings = {}
                            window.ipcRenderer.invoke("print-window", { data: data,settings : settings}).then((response) => {
                            });
                    }, 400);
                });
            });
        },
        handleLoad(event) {
            console.log(event);
        }
    },
    components: { A4,Thermal }
}
</script>