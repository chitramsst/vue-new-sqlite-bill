import type { User,Settings,DbResponseCompanySettings, MasterSettings } from '@/types/types';
import { defineStore } from 'pinia'
export interface WholeSettings extends Settings,MasterSettings{}

export const useAuthStore = defineStore('authStore', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        user : null as User | null,
        settings : null  as null | WholeSettings,
        language : 'en',
      }
    },
    getters:{
        isLoggedIn()
        {
            if(this.user == null)
            {
                return false;
            }
            else{
                return true;
            }
        }
    },
    actions : {
        checkLogin()
        {
            return false;
        },
        // getSettings()
        // {
        //     if(!this.user)
        //     {
        //         return
        //     }
        //     window.ipcRenderer.invoke('database-function', {
        //         target: 'get-company-settings',
        //         data: {
        //             user_id: this.user?.id
        //         }
        //     }).then((response: DbResponseCompanySettings) => {
        //         this.settings = (response.settings as any)
        //     });
        // },
        // formatCurrency(num : any)
        // {
        //     num = parseFloat(num)
        //     if(Number.isNaN(num))
        //     {
        //         num = 0.00 
        //     }
        //     if(this.settings)
        //     {
        //         if(this.settings.currency_alignment == '1')
        //         {
        //             return (this.settings.currency_symbol ?? '$') +  parseFloat(num).toFixed(2)
        //         }
        //         else{
        //             return parseFloat(num).toFixed(2) + (this.settings.currency_symbol ?? '$')
        //         }
        //     }
        //     return parseFloat(num).toFixed(2) + '$'
        // },
        // getCurrency()
        // {
        //     return (this.settings.currency_symbol ?? '$')
        // },
        // getTaxPercentage()
        // {
        //     return (this.settings?.tax_percentage ?? '0')
        // },
        // getPaymentType(type : any)
        // {
        //     type = parseInt(type)
        //     switch(type){
        //         case 1:
        //             return 'Cash';
        //         case 2:
        //             return 'Card';
        //         case 3:
        //             return 'UPI'
        //         case 4:
        //             return 'Cheque'
        //         case 5:
        //             return 'Bank Transfer'
        //     }
        // },
        // getUserType(type : any)
        // {
        //     type = parseInt(type)
        //     switch(type){
        //         case 2:
        //             return 'Admin';
        //         case 3:
        //             return 'Tailor';
        //         case 4:
        //             return 'Accountant'
        //         default:
        //             return '-'
        //     }
        // }
    },
    persist:true
});