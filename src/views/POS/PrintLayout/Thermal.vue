<template>
    <main class="" v-if="cartData">
        <div class="row justify-content-center align-items-start">
            <div class="col-auto text-center">
                <div class="" style="width: 12cm;">
                    <img :src="invoice_logo" alt="Company logo" style="height:60px" />
                    <div class="text-center">
                        <h5 class="text-uppercase">{{ authStore.settings?.company_name ? authStore.settings?.company_name :
                            '' }}</h5>
                        <!--Tax Number-->
                        <p class="mb-25">
                            <span>{{ authStore.settings?.address ? authStore.settings?.address : '' }}</span>
                        </p>
                        <p class="mb-1">
                            <span>{{ authStore.settings?.company_phone ? authStore.settings?.company_phone : '' }}</span>
                            <span>{{ authStore.settings?.company_email ? authStore.settings?.company_email : '' }}</span>
                        </p>
                    </div>
                    <div class="text-center p-50 mb-1" style="background: #2e5984">
                        <h5 class="mb-0 text-uppercase text-white">{{ translate('Tax Invoice')}}</h5>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-50">
                        <div class="">
                            <span class="mr-50">{{ translate('Invoice')}}</span>
                        </div>
                        <div class="font-weight-bolder"><span> {{ cartData.dataValues.invoice_prefix + '-' +
                            cartData.dataValues.invoice_number }}</span></div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-50">
                        <div class="">
                            <span class="mr-50">{{ translate('Date')}}</span>
                        </div>
                        <div class="font-weight-bold"><span>{{ moment(cartData.dataValues.date).format('DD/MM/YYYY hh:mm A')
                        }}</span></div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-1 text-left">
                                <div class="mb-1 text-purple">
                                    <span class="mr-50">{{ translate('Invoice To')}}</span>
                                </div>
                                <div class="">
                                    <h6 class="text-uppercase">{{ cartData.dataValues.customer_name ?? translate('Walk-In Customer') }}
                                    </h6>
                                    <template v-if="cartData.dataValues.customer">
                                        <!--Tax Number-->
                                        <p class="mb-0">
                                            <span>{{ cartData.dataValues.customer?.phone_number }}</span>
                                            <span>{{ cartData.dataValues.customer?.email }}</span>
                                        </p>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div style="text-align: end;" class="mb-1">
                                <div class="text-xs text-white/50 mt-5">{{ translate('Status')}}:</div>

                                <div class="text-white/70 mt-1 text-sm flex  gap-2"
                                    v-if="status < cartData.dataValues.total && status != 0">
                                    <div class="h-3 w-3 bg-yellow-500 rounded-full"></div>
                                    <div class="">{{ translate('Partially Paid')}} </div>
                                </div>
                                <div class="text-white/70 mt-1 text-sm flex  gap-2" v-else-if="status == 0">
                                    <div class="h-3 w-3 bg-red-500 rounded-full"></div>
                                    <div class="">{{ translate('Unpaid')}} </div>
                                </div>
                                <div class="text-white/70 mt-1 text-sm flex  gap-2" v-else>
                                    <div class="h-3 w-3 bg-green-500 rounded-full"></div>
                                    <div class="">{{ translate('Paid')}} </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="table-responsive text-left">
                        <table class=""
                            style="border:.5px solid #94939c; border-collapse: collapse; width: 100%; margin-bottom: 1rem;">
                            <thead style="color: #fff; background-color: #2e5984; !important border:.5px solid #fff;">
                                <tr style="border:0px solid #94939c">
                                    <th style="width: 45%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: .9rem; border-right: 0px solid #fff;"
                                        scope="col">
                                        <div class="font-weight-bold">{{ translate('Item Name')}}</div>
                                    </th>
                                    <th style="width: 15%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: .9rem; border-right: 0px solid #fff;"
                                        scope="col">
                                        <div class="font-weight-bold">{{ translate('Price')}}</div>
                                    </th>
                                    <th style="width: 15%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: .9rem; border-right: 0px solid #fff; text-align: left;"
                                        scope="col">
                                        <div class="font-weight-bold">{{ translate('QTY')}}</div>
                                    </th>
                                    <th style="width: 25%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: .9rem; text-align: right;"
                                        scope="col">
                                        <div class="font-weight-bold">{{ translate('Total')}}</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="border:.5px solid #94939c" v-for="(detail, index) in cartItems"
                                    :key="detail.dataValues.id">
                                    <td
                                        style="border-right: 1px solid #94939c; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; font-size: .95rem; font-weight: 500;">
                                        {{ detail.dataValues.item_name }}
                                    </td>
                                    <td
                                        style="border-right: 1px solid #94939c; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; font-size: .95rem; font-weight: 500;">
                                        <div class="m-0">
                                            <span class="">{{ authStore.formatCurrency(detail.dataValues.rate) }}</span>
                                        </div>
                                    </td>
                                    <td
                                        style=" border-right: 1px solid #94939c; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; font-size: .95rem; font-weight: 500;">
                                        <div class="m-0">
                                            <span>{{ parseFloat(detail.dataValues.quantity).toFixed(2) }}</span>
                                        </div>
                                    </td>
                                    <td
                                        style="text-align: right; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; font-size: .95rem; font-weight: 500;">
                                        <div class="m-0">
                                            <span class="">{{ authStore.formatCurrency(detail.dataValues.total) }}</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mb-1 text-left">
                        <div class="row mb-50 align-items-center">
                            <div class="col font-weight-bold">{{ translate('Taxable Amount')}} :</div>
                            <div class="col-auto font-weight-bolder">
                                <span>{{ authStore.formatCurrency(cartData.dataValues.subtotal) }}</span>
                            </div>
                        </div>
                        <div class="row mb-50 align-items-center">
                            <div class="col font-weight-bold">{{ translate('Tax')}} ({{
                                parseFloat(cartData.dataValues.tax_percentage).toFixed(2) }}%) :</div>
                            <div class="col-auto font-weight-bolder">
                                <span>{{ authStore.formatCurrency(cartData.dataValues.tax_total) }}</span>
                            </div>
                        </div>
                        <div class="row mb-50 align-items-center">
                            <div class="col font-weight-bold">{{ translate('Discount')}} <span
                                    v-if="cartData.dataValues.discount_type == 2">({{ cartData.dataValues.discount }}%)</span>
                                :</div>
                            <div class="col-auto font-weight-bolder">
                                <span>{{ authStore.formatCurrency(cartData.dataValues.discount_total) }}</span>
                            </div>
                        </div>
                        <div class="row mb-50 align-items-center">
                            <div class="col font-weight-bold">{{ translate('Grand Total')}} :</div>
                            <div class="col-auto font-weight-bolder">
                                <span>{{ authStore.formatCurrency(cartData.dataValues.total) }}</span>
                            </div>
                        </div>
                        <hr class="my-50">
                    </div>
                    <div class="">
                        <div class="mb-1">{{ translate('Thank You For Your Business !')}}</div>
                        <div class="d-flex align-items-center text-uppercase font-weight-bold justify-content-center">
                            <div class="mr-1">{{ translate('Powered by')}}</div>
                            <img :src="invoice_logo" alt="Company logo" style="height:25px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    props: {
        authStore: {},
        cartData: {},
        status: {},
        translate: {},
        cartItems: {
            type: Array,
            default: []
        },
        moment: {},

    },
    data() {
        return {
            arabic: false,
            invoice_logo: 'logo.png',
            footer_logo: 'logo-login.png',
        }
    }
}
</script>