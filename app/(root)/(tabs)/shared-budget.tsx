import { ScrollView } from "react-native";
import React from "react";
import SharedBudgetHeader from "@/components/shared-budget/SharedBudgetHeader";
import SharedBudgetList from "@/components/shared-budget/SharedBudgetList";

export default function SharedBudgetScreen() {
  return (
    <ScrollView className="mb-16">
      <SharedBudgetHeader />
      <SharedBudgetList />
    </ScrollView>
  );
}
