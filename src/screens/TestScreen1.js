import React, { Component } from "react"
import { Text, View, StyleSheet, BackHandler } from "react-native"
import { SafeAreaView, DrawerActions } from "react-navigation"

import Header from "../components/Header"
import { globalColors } from "../themes/colors"

class TestScreen1 extends Component {
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress)
  }

  handleBackPress = () => {
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
    return true
  }

  render() {
    const { container, bgView } = styles

    return (
      <SafeAreaView style={container}>
        <View style={bgView}>
          <Header headerText="Test1" hideRightIcon />
          <Text>Poop 11111111</Text>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  bgView: {
    backgroundColor: globalColors.white,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: globalColors.fiord,
  },
})

export default TestScreen1
