import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Rm from "../../../api/rm";
import FavoriteScreen from "../../../screen/FavoriteScreen";
import MiCuenta from "../../../screen/MiCuenta";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { styles } from './TabNavigation.styles'
import StackNavigation from "../StackNavigation/StackNavigation";
import iconRick from '../../../assets/img/logo-button.png';
import StackAccount from "../StackNavigation/StackAccount";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
    
  return (
    <Tab.Navigator
      initialRouteName="StackNavigation"
      screenOptions={({ route }) => ({
        tabBarIcon: (routeStatus) => setIcon(route, routeStatus),
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      })} >
        <Tab.Screen
        name="Account"
        component={StackAccount}
        options={{
          title: "Mi cuenta",
        }}
      />
      <Tab.Screen
        name="StackNavigation"
        component={StackNavigation}
        options={{
          title: "",
          tabBarIcon: () => <Image source={iconRick} style={{width: 80, height: 80, marginBottom: 40 }} />,
          headerShown: false,
          headerTransparent: true,
          tabBarLabel: ""

        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          title: "Favoritos",
          headerShown: false,
          headerTransparent: true
        }}
      />
      {/* <Tab.Screen
        name="Settings"
        component={Configuracion}
        options={{
          title: "Configuración",
        }}
      /> */}
    </Tab.Navigator>
  );
}

const setIcon = (route, routeStatus) => {
  let iconName = '';
  let color = "#58b14a"
  if (route.name === 'Home') {
    // iconName = 'home';
    }
    if (route.name === 'Settings') {
    iconName = 'cog';
    }
    if (route.name === 'Favorites') {
    iconName = 'heart';
    }
    if (route.name === 'Account') {
    iconName = 'user';
    }
    if (routeStatus.focused) {
    color = '#70d208';
    }

  return <AwesomeIcon name={iconName} color={color} style={styles.icon} />
  }
