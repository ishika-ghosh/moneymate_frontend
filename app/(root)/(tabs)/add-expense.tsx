import { ScrollView } from "react-native";
import React, { useState } from "react";
import CategorySlider from "@/components/add-expense/CategorySlider";
import ExpenseInput from "@/components/add-expense/ExpenseInput";

export default function AddExpenseScreen() {
  const [key, setKey] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [details, setDetails] = useState<any>({
    desc: "",
    amt: "",
  });
  const handleSubmit = () => {
    console.log(details, selectedCategory);
  };

  return (
    <ScrollView>
      <CategorySlider
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ExpenseInput
        details={details}
        setDetails={setDetails}
        handleSubmit={handleSubmit}
      />
    </ScrollView>
  );
}
