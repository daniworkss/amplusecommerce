// store context
import {create} from 'zustand';

const useStoreDetails = create((set) => ({
 storeData: {},
 products: [],
 subscribedEmails:[],
 customerDetails:{},
setCustomerDetails:(customerDetails) => set({customerDetails}),
 setSubscribedEmails: (subscribedEmails) => set({subscribedEmails}),
 setStoreData: (storeData) => set({ storeData }),
 setProducts: (products) => set({ products }),

}))

export default useStoreDetails;