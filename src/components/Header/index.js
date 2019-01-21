import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native"
import { withNavigation } from "react-navigation"

import icons from "../../themes/icons"
import styles from "./styles"

class Header extends Component {
  onPressLeft = () => this.props.navigation.openDrawer()
  onPressBack = () => this.props.navigation.pop()

  backButton() {
    const {
      back, onPressLeft, leftIcon, prev, done,
    } = this.props

    if (back) {
      if (prev === "search") {
        return (
          <TouchableOpacity
            onPress={this.onPressSearch}
            style={styles.leftItemContainer}
            hitSlop={{
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            }}
          >
            <Text style={styles.backTextStyle}>{"< Back"}</Text>
          </TouchableOpacity>
        )
      } else if (prev === "searchEverything") {
        return (
          <TouchableOpacity
            onPress={this.onPressSearchEverything}
            style={styles.leftItemContainer}
            hitSlop={{
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            }}
          >
            <Text style={styles.backTextStyle}>{"< Back"}</Text>
          </TouchableOpacity>
        )
      } else if (prev === "searchEverythingResults") {
        return (
          <TouchableOpacity
            onPress={this.onPressSearchEverythingResults}
            style={styles.leftItemContainer}
            hitSlop={{
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            }}
          >
            <Text style={styles.backTextStyle}>{"< Back"}</Text>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity
            onPress={this.onPressBack}
            style={styles.leftItemContainer}
            hitSlop={{
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            }}
          >
            <Text style={styles.backTextStyle}>{"< Back"}</Text>
          </TouchableOpacity>
        )
      }
    } else if (done) {
      return (
        <TouchableOpacity
          onPress={this.onDonePress}
          style={styles.leftItemContainer}
          hitSlop={{
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          }}
        >
          <Text style={styles.backTextStyle}>Cancel</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={onPressLeft || this.onPressLeft}
          style={styles.leftItemContainer}
          hitSlop={{
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          }}
        >
          <Image source={leftIcon ? icons[leftIcon] : icons.menu} />
        </TouchableOpacity>
      )
    }
  }

  render() {
    const {
      headerText, onPressRight, hideRightIcon, searchString, placeHolderText, searchCapture,
    } = this.props
    const placeholder = placeHolderText || "Find exhibitors, sessions and more"

    if (this.props.navigation.state.routeName === "search" || this.props.type === "search") {
      return (
        <View style={styles.searchContainer}>
          <View style={styles.searchSection}>
            <Image source={icons.searchInput} style={styles.searchIcon} />
            {searchCapture !== null ? <TextInput autoCorrect={false} autoFocus style={styles.searchInput} value={String(searchCapture)} placeholder={placeholder} returnKeyType="search" onChangeText={text => this.onChangeText(text)} onSubmitEditing={text => this.onSubmitEditing(text)} clearButtonMode="while-editing" underlineColorAndroid="transparent" /> : <TextInput autoCorrect={false} autoFocus style={styles.searchInput} value={searchString} placeholder={placeholder} returnKeyType="search" onChangeText={text => this.onChangeText(text)} onSubmitEditing={text => this.onSubmitEditing(text)} clearButtonMode="while-editing" underlineColorAndroid="transparent" />}
          </View>
          <TouchableOpacity onPress={this.onPressCancel}>
            <Text style={styles.backTextStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )
    }

    if (this.props.navigation.state.routeName === "searchEverything" || this.props.type === "searchEverything") {
      return (
        <View style={styles.searchContainer}>
          <View style={styles.searchSection}>
            <Image source={icons.searchInput} style={styles.searchIcon} />
            <TextInput autoCorrect={false} style={styles.searchInput} value={searchString} placeholder={placeholder} returnKeyType="search" onChangeText={text => this.onChangeText(text)} onSubmitEditing={text => this.onSubmitEditing(text)} clearButtonMode="while-editing" underlineColorAndroid="transparent" />
          </View>
          <TouchableOpacity
            onPress={this.onPressCancel}
            hitSlop={{
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            }}
          >
            <Text style={styles.backTextStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.viewStyle}>
        {this.backButton()}
        <View style={styles.headerTextContainer}>
          { headerText ? (
            <Text numberOfLines={1} style={styles.textStyle}>
              {headerText.toUpperCase()}
            </Text>
          ) : (
            null
          )}
        </View>
        <TouchableOpacity
          onPress={onPressRight || this.onPressSearch}
          style={styles.rightItemContainer}
          hitSlop={{
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          }}
        >
          {!hideRightIcon && <Image source={icons.search} />}
        </TouchableOpacity>
      </View>
    )
  }
}

export default withNavigation(Header)
