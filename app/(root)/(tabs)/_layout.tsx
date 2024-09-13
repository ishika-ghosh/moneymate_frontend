import { View, Text,StyleSheet } from 'react-native'
import { Home,Expense,SharedBudget,AddExpense,Statistics } from '@/components/TabIcons';
import CustomTabBarButton from '@/components/TabIcons';
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown:false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabNavigator,
        tabBarHideOnKeyboard: true,
      }}
      sceneContainerStyle={{
        paddingBottom: 20,
      }}>
        <Tabs.Screen name='home' options={{
          tabBarIcon: ({ focused }) => <Home focused={focused} />,
        }}/>
        <Tabs.Screen name='statistics' options={{
          tabBarIcon: ({ focused }) => <Statistics focused={focused} />,
        }}/>
        <Tabs.Screen name='add-expense' options={{
          headerShown: false,
          tabBarIcon: () => <AddExpense />,
          tabBarButton: (props) => <CustomTabBarButton title=""{...props} />,
          tabBarStyle: { display: "none" },
        }}/>
        <Tabs.Screen name='expense' options={{
          tabBarIcon: ({ focused }) => <Expense focused={focused} />,
        }}/>
        <Tabs.Screen name='shared-budget' options={{
          tabBarIcon: ({ focused }) => <SharedBudget focused={focused} />,
        }}/>
    </Tabs>
  )
}
const styles = StyleSheet.create({
  tabNavigator: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    borderRadius: 15,
    height: 50,
    backgroundColor: "rgba( 131, 131, 156, 0.7 )",
    borderColor: "rgba( 131, 131, 156, 0.5 )",
    borderWidth: 2,
  },
});