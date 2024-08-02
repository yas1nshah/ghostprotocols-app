import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

const useThemeColors = () => {
  const {colorScheme} = useColorScheme();
    return Colors[colorScheme === "dark" ? "dark" : "light"];
  };
  
  export default useThemeColors;