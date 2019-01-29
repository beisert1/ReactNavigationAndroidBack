import React, { Component } from "react"

import Routes from "./config/routes"
import NavigatorService from "./services/navigator"

class App extends Component {
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
