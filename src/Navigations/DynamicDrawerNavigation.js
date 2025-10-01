import { createDrawerNavigator } from "@react-navigation/drawer";
import { h, w } from "walstar-rn-responsive";
import DynamicBottomNav from "./DynamicBottomNav";
import DynamicCustomDrawer from "./DynamicCustomDrawer";
import usePermissionCheck from "../Utils/HasPermission";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import JobsCategoryMnt from "../Screens/Admin/Home/JobsCategoryMnt";

export default function DynamicDrawerNavigation() {
  const Drawer = createDrawerNavigator();
  const hasPermission = usePermissionCheck()
  const insets = useSafeAreaInsets(); // get safe area insets
  
  return (
    <Drawer.Navigator 
    screenOptions={{headerShown:false,
    drawerStyle: {
      marginTop:h(4),
      width:w(80),
      borderTopRightRadius: w(4),
      borderBottomRightRadius: w(4),
      paddingBottom:Math.max(insets.bottom, h(2)),
    }
  }}
     drawerContent={props => <DynamicCustomDrawer {...props} />}>
      <Drawer.Screen name="bottomnavigation" component={DynamicBottomNav} />
      <Drawer.Screen name="JobsCategoryMnt" component={JobsCategoryMnt} />

    </Drawer.Navigator>
  );
}