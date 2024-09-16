
import { TextInputProps, TouchableOpacityProps } from "react-native";
declare interface ButtonProps extends TouchableOpacityProps {
  title: string|"";
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}
declare interface TabBarProps{
  focused:boolean
}
declare interface UserProps{
  name:string|undefined,
  profilePicture:string
}
declare interface HomeProps{
  list:Array<any>|[],
  active:Number|1
}
declare interface ItemProps{
  title:string
}
declare interface BottomSheetProps{
  setShowModal:(boolean)=>any,
  setBudget:(boolean)=>any,
  setSubmit:(boolean)=>any,
  budget:Number,
}
declare interface ExpenseProps{
  monthValue:string,
    setCurrentDay:any,
    currentDay:any,
    dateList:any,
    setOpenDropDown:(boolean)=>any,
    openDropDown:boolean,
}