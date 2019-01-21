import React, { Component } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-navigation"

import tabs from "../../config/tabNav"
import icons from "../../themes/icons"
import styles from "./styles"

class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  nav(tab) {
    const { navigate } = this.props.navigation

    console.log(tab)
  }

  render() {
    const { state } = this.props.navigation
    return (
      <SafeAreaView>
        <View style={styles.container}>
          {tabs.map((tab, index) => (
            <TouchableOpacity onPress={() => this.nav(tab)} key={index} style={styles.tabButton}>
              {index === state.index ? <Image source={icons[`${tab.icon}Fill`]} /> : <Image source={icons[tab.icon]} />}
              <Text style={[styles.tabButtonText, index === state.index ? styles.selectedTab : null]}>{tab.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    )
  }
}

export default Tabs