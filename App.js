import React from "react";
import LoginStack from "./Navigation/navigate";
import { NavigationContainer } from "@react-navigation/native";




export default class App extends React.Component{

  constructor(){
    super();
    this.state={  

    }
  }

  render(){
    return(
      <NavigationContainer>
        <LoginStack/>
      </NavigationContainer>
    )
  }
}



