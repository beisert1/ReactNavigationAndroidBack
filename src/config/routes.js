import React from "react"
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator, createDrawerNavigator } from "react-navigation"

import Drawer from "../components/DrawerMenu"
import Tabs from "../components/Tabs"

import LoadingScreen from "../screens/loading"
import TestScreen1 from "../screens/TestScreen1"
import TestScreen2 from "../screens/TestScreen2"

const TestStack = createStackNavigator(
  {
    testScreen1: TestScreen1,
    testScreen2: TestScreen2,
  },
  { headerMode: "none" },
)

const AppStack = createBottomTabNavigator(
  {
    testStack: TestStack,
  },
  {
    tabBarComponent: ({ navigation, screenProps }) => <Tabs navigation={navigation} screenProps={screenProps} />,
    tabBarPosition: "bottom",
    backBehavior: "none",
  },
)

const LoadingStack = createStackNavigator(
  {
    LoadingScreen,
  },
  { headerMode: "none" },
)

const DrawerMenu = createDrawerNavigator(
  { Drawer: { screen: AppStack } },
  {
    drawerWidth: 250,
    drawerLockMode: "locked-closed",
    contentComponent: props => <Drawer {...props} />,
  },
)

const App = createSwitchNavigator({
  Loading: LoadingStack,
  App: DrawerMenu,
})

const root = createStackNavigator({
  Main: App,
}, { mode: "modal", headerMode: "none" })

export default root
