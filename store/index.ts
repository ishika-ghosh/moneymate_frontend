import { create } from "zustand";


export const useUserInfoStore=create<any>((set)=>({
    userName:"",
    userEmail:"",
    userImageUrl:"",
    userCreatedAt:"",
    userCategoryList:[],
    userExpenseList:[],
    pieChartData:[],
    barChartData:[],
    todaysTotal:0,
    setUserInfo:({name,email,imageUrl,createdAt}:any)=>{
        set(()=>({
            userName:name,
            userEmail:email,
            userImageUrl:imageUrl,
            userCreatedAt:createdAt
        }))
    },
    setCategoryList:({categoryList}:any)=>{
        set(()=>({
            userCategoryList:categoryList
        }))
    },
    setExpenseList:({expenseList}:any)=>{
        set(()=>(
            {
                userExpenseList:expenseList
            }
        ))
    },
    setPieChartData:({list,total,barchartData}:any)=>{
        set(()=>({
            pieChartData:list,
            barChartData:barchartData,
            todaysTotal:total
        }))
    }
}))