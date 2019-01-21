import React, { Component } from "react"
import { View, Text, Modal, TouchableOpacity } from "react-native"
import { DrawerActions } from "react-navigation"

import Header from "../Header"
import styles from "./styles"
import menu from "../../config/drawerNav"

class DrawerMenu extends Component {
  state = {
    modalVisible: false,
    url: "",
    title: "",
  }

  onPressItem = (navigateTo, type, name, id) => () => {
    this.props.navigation.dispatch(DrawerActions.closeDrawer())

    if (!navigateTo) {
      return null
    } else {
      this.props.navigation.navigate(navigateTo)
    }
  }

  setModalVisible = (modalVisible, url, title) => () => this.setState({ modalVisible, url, title })

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          {menu.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={this.onPressItem(item.navigateTo, item.type, item.name, item.id)}
              style={styles.menuItem}
            >
              <Text style={styles.menuText}>{item.name}</Text>
              {item.subMenuName && <Text style={styles.subMenuText}>{item.subMenuName}</Text>}
            </TouchableOpacity>
          ))}
        </View>
        <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => this.setState({ modalVisible: false })} >
          <Header headerText={this.state.title} leftIcon="back" onPressLeft={this.setModalVisible(false)} hideRightIcon />
        </Modal>
      </View>
    )
  }
}

export default DrawerMenu
