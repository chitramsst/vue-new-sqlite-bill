<template>
    <main class="" v-if="invoice">
        <div class="row mb-2 justify-content-between align-items-end">
            <div class="col-6">
                <img :src="invoice_logo" alt="Company logo" style="height:60px" />
            </div>
            <div class="col-4">
                <div class="text-right">
                    <h2 class="text-uppercase m-0 font-weight-bolder">Invoice</h2>
                </div>
            </div>
        </div>
        <div class="row mb-2 justify-content-between">
            <div class="col-6">
                <div class="">
                    <h5 class="text-uppercase">{{ authStore.settings?.company_name ? authStore.settings?.company_name : ''
                    }}</h5>
                    <p class="mb-25">
                        <span>{{ authStore.settings?.address ? authStore.settings?.address : '' }}</span>
                    </p>
                    <p class="mb-0">
                        <span>{{ authStore.settings?.company_phone ? authStore.settings?.company_phone : '' }}</span>
                        <span>{{ authStore.settings?.company_email ? authStore.settings?.company_email : '' }}</span>
                    </p>
                </div>
            </div>
            <div class="col-4">
                <div class="text-right">
                    <h4 class="text-uppercase text-purple">
                        <span>#</span>
                        {{ invoice.dataValues.invoice_prefix + '-' + invoice.dataValues.invoice_number }}
                    </h4>
                    <p class="mb-25">
                        <span class="me-50">{{ translate('Date')}} :</span>
                        <span>&nbsp; {{ moment(invoice.dataValues.date).format('DD/MM/YYYY hh:mm A') }}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="row mb-2 justify-content-between align-items-start">
            <div class="col-6">
                <div class="col-6">
                    <p class="mb-50 text-uppercase text-purple font-weight-bold">{{ translate('Invoice To')}}</p>
                    <h4 class="text-uppercase">{{ invoice.dataValues.customer_name ?? translate('Walk-In Customer') }}</h4>
                    <template v-if="invoice.dataValues.customer">
                        <!--Tax Number-->
                        <p class="mb-25">
                            <span>{{ invoice.dataValues.customer?.first_name }}</span>
                        </p>
                        <p class="mb-0">
                            <span>{{ invoice.dataValues.customer?.phone_number }}</span>
                            <span>{{ invoice.dataValues.customer?.email }}</span>
                        </p>
                    </template>
                </div>
                <div class="col-6">
          

                    <div class="invoice-info" v-if="invoice.dataValues.notes">
                    <p class="mb-1 text-uppercase text-purple fw-bold">{{ translate('Notes/Remarks')}}</p>
                    <p class="mb-0 text-xs">{{ invoice.dataValues.notes }}</p>
                </div>

                </div>
            </div>
            <div class="col-4" style="text-align: end;">
                <div class="text-xs text-white/50 mt-5">{{ translate('Status')}}:</div>

                <div class="text-white/70 mt-1 text-sm flex  gap-2"
                        v-if="status < invoice.dataValues.total && status != 0">
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
        <div class="row mb-2">
            <div class="col-12">
                <div class="table-responsive">
                    <table class=""
                        style="border:.5px solid #94939c; border-collapse: collapse; width: 100%; margin-bottom: 1rem;">
                        <thead style="color: #fff; background-color: #2e5984; !important border:.5px solid #fff;">
                            <tr style="border:0px solid #94939c">
                                <th style="width: 5%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: .9rem; border-right: 0px solid #fff;"
                                    scope="col">#</th>
                                <th style="width: 30%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: .9rem; border-right: 0px solid #fff;"
                                    scope="col">{{ translate('Item Name')}}</th>
                                <th style="width: 10%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: .9rem; border-right: 0px solid #fff; text-align: left;"
                                    scope="col">{{ translate('QTY')}}</th>
                                <th style="width: 10%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: .9rem; border-right: 0px solid #fff; text-align: left;"
                                    scope="col">{{ translate('Rate')}}</th>
                                <th style="width: 12%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: .9rem; text-align: right;"
                                    scope="col">{{ translate('Total')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border:.5px solid #94939c" v-for="(detail, index) in invoiceDetails"
                                :key="detail.dataValues.id">
                                <td
                                    style="border-right: 1px solid #94939c; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; font-size: .95rem; font-weight: 500;">
                                    <div class="">{{ index + 1 }}</div>
                                </td>
                                <td
                                    style="border-right: 1px solid #94939c; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; font-size: .95rem; font-weight: 500;">
                                    {{ detail.dataValues.item_name }}
                                </td>
                                <td
                                    style=" border-right: 1px solid #94939c; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; font-size: .95rem; font-weight: 500;">
                                    <div class="m-0">
                                        <span>{{ parseFloat(detail.dataValues.quantity).toFixed(2) }}</span>
                                    </div>
                                </td>
                                <td
                                    style="border-right: 1px solid #94939c; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; font-size: .95rem; font-weight: 500;">
                                    <div class="m-0">
                                        <span class="">{{ authStore.formatCurrency(detail.dataValues.rate) }}</span>
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
                        <tfoot
                            style="color: #000; background-color: #fff; font-weight: 500; border:.5px solid #94939c !important">
                            <tr>
                                <td style="width: 5%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: 1rem; border-right: 1px solid #94939c;"
                                    scope="col">
                                </td>
                                <td style="width: 30%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: 1rem; border-right: 1px solid #94939c; text-align: right;"
                                    scope="col">
                                    {{ translate('Total')}}
                                </td>
                                <!-- <td style="width: 10%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: 1rem; border-right: 1px solid #94939c;" scope="col">
                                </td> -->
                                <td style="width: 10%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: 1rem; border-right: 1px solid #94939c;"
                                    scope="col">
                                </td>
                                <td style="width: 10%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: 1rem; border-right: 1px solid #94939c;"
                                    scope="col">
                                </td>
                                <td style="width: 15%; padding: .35rem .75rem .35rem .75rem; vertical-align: middle; text-transform: uppercase; font-size: 1rem; text-align: right;"
                                    scope="col">
                                    <div class="m-0">
                                        <span class="">{{ authStore.formatCurrency(invoice.dataValues.subtotal) }}</span>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <div class="row justify-content-between align-items-start mb-3">
            <div class="col-5">

            </div>
            <div class="col-5">
                <div class="mb-2">
                    <div class="row mb-50 align-items-center">
                        <div class="col fw-bold">{{ translate('Subtotal')}} :</div>
                        <div class="col-auto fw-bolder">
                            <span>{{ authStore.formatCurrency(invoice.dataValues.subtotal) }}</span>
                        </div>
                    </div>
                    <div class="row mb-50 align-items-center">
                        <div class="col fw-bold">{{ translate('Tax')}}
                            ({{ parseFloat(invoice.dataValues.tax_percentage).toFixed(2) }}%) :</div>
                        <div class="col-auto fw-bolder">
                            <span>{{ authStore.formatCurrency(invoice.dataValues.tax_total) }}</span>
                        </div>
                    </div>
                    <div class="row mb-50 align-items-center">
                        <div class="col fw-bold">{{ translate('Discount')}} <span v-if="invoice.dataValues.discount_type == 2">({{
                            invoice.dataValues.discount }}%)</span>:</div>
                        <div class="col-auto fw-bolder">
                            <span>{{ authStore.formatCurrency(invoice.dataValues.discount_total) }}</span>
                        </div>
                    </div>
                    <hr class="my-50" />
                    <div class="row align-items-center">
                        <div class="col fw-bold">{{ translate('Total')}} :</div>
                        <div class="col-auto fw-bolder">
                            <span>{{ authStore.formatCurrency(invoice.dataValues.total) }}</span>
                        </div>
                    </div>
                    <hr class="my-50" />
                </div>
                <div class="">
                    <p class="mb-0 text-capitalize text-xs">{{ translate('Authorized Signatory')}}</p>
                </div>
            </div>
        </div>
        <div class="d-flex align-items-center text-uppercase font-weight-bold">
            <div class="mr-1">{{ translate('Powered by')}}</div>
            <h5 class="text-uppercase p-0">{{ authStore.settings?.app_name ? authStore.settings?.app_name : '' }}</h5>
        </div>
    </main>
</template>

<script>
export default {
    props: {
        authStore: {},
        invoice: {},
        status: {},
        translate: {},
        invoiceDetails: {
            type: Array,
            default: []
        },
        moment: {},

    },
    data() {
        return {
            invoice_logo: 'logo.png',
            footer_logo: 'logo-login.png',
        }
    }
}
</script>