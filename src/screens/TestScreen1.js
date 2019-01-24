import React, { Component } from "react"
import { Text, View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-navigation"

import Header from "../components/Header"
import { globalColors } from "../themes/colors"

class TestScreen1 extends Component {
  render() {
    const { container, bgView } = styles

    return (
      <SafeAreaView style={container}>
        <View style={bgView}>
          <Header headerText="testScreen1" hideRightIcon />
          <Text>Testing 1</Text>
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
