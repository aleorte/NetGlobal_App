import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Inicio from "./Inicio";
import Profile from "./Profile";
import Inactivities from "./Inactivities";
import { Ionicons } from "@expo/vector-icons";
import Assignment from "./Assignment";

const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Inicio") {
            iconName = focused ? "ios-home" : "home-outline";
          } else if (route.name === "Tareas") {
            iconName = focused ? "briefcase" : "briefcase-outline";
          } else if (route.name === "Solicitudes") {
            iconName = focused ? "file-tray-full" : "file-tray-full-outline";
          } else {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Tareas" component={Assignment} />
      <Tab.Screen name="Solicitudes" component={Inactivities} />
      <Tab.Screen name="Mi Perfil" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabs;
