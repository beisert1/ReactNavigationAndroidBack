import React, { Component } from "react"
import { StyleSheet, View } from "react-native"

import { themeColors } from "../themes/colors"

class Loading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myRegID: "",
      isDone: false,
      splashTimer: null,
    }
  }

  conditionalRendering() {
    const { navigation } = this.props
    navigation.navigate("testScreen1")
  }

  render() {
    return (
      <View style={styles.imageContainer}>
        {this.conditionalRendering()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: themeColors.onBoardBGStartColor,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
})

export default Loading
