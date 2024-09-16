import { ButtonProps, TabBarProps } from "@/types/type";
import { AntDesign,MaterialCommunityIcons,FontAwesome,Ionicons,MaterialIcons,Entypo } from "@expo/vector-icons";


import { View, Text, TouchableOpacity } from "react-native";

function Home({ focused}:TabBarProps) {
  return (
    <AntDesign
      name="home"
      size={focused?30:24}
      color={focused ? "#ffffff" : "#979899"}
      className=""
    />
  );
}

function Budget({ focused }:TabBarProps) {
  return (
    <MaterialCommunityIcons
      name="widgets-outline"
      size={focused?30:24}
      color={focused ? "#ffffff" : "#979899"}
    />
  );
}

function Expense({ focused }:TabBarProps) {
  return (
    <Entypo
      name="wallet"
      size={focused?30:24}
      color={focused ? "#ffffff" : "#979899"}
    />
  );
}
function SharedBudget({ focused }:TabBarProps) {
  return (
    <AntDesign
      name="addusergroup"
      size={focused?30:24}
      color={focused ? "#ffffff" : "#979899"}
      />
    );
}
function Statistics({ focused }:TabBarProps) {
  return (
    <MaterialIcons
      name="auto-graph"
      size={focused?30:24}
      color={focused ? "#ffffff" : "#979899"}
    />
  );
}
export default function CustomTabBarButton({ children, onPress }:ButtonProps) {
  return (
    <TouchableOpacity
      style={{ top: -20, justifyContent: "center", alignItems: "center" }}
      onPress={onPress}
    >
      <View
        style={{ height: 50, width: 50, borderRadius: 25 }}
        className="bg-primary-100"
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}
function AddExpense() {
  return <Ionicons name="add" size={30} color="white" />;
}

export { Home, Budget, Expense, SharedBudget, AddExpense, Statistics };
