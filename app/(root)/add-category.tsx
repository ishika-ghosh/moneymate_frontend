import { View, Text } from 'react-native'
import React from 'react'
import AddCategoryForm from '@/components/add-category/AddCategoryForm'

export default function AddCategory() {
  return (
    < >
    <View>
        <Text className='text-gray-20 font-JakartaExtraBold text-center text-xl my-5'>Add Your New Expense Category</Text>
    </View>
        <AddCategoryForm/>

    </>
  )
}