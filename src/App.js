import React, { Component } from "react"
import SplashScreen from "react-native-splash-screen"

import Routes from "./config/routes"
import NavigatorService from "./services/navigator"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      SplashScreen.hide()
    }, 3000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle)
  }

  render() {
    return (
      <Routes
      ref={navigatorRef => {
        NavigatorService.setContainer(navigatorRef)
      }}
    />
    )
  }
}

export default App
