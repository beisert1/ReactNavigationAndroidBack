import React from "react"
import { TouchableOpacity, Text } from "react-native"
import { buttonWrapper, buttonLabel, halfButtonWrapper, fullWidthButtonWrapper } from "./styles"

const Button = ({
  buttonType,
  buttonText,
  onPress,
  children,
  half,
  fullWidth,
}) =>
  (children && fullWidth ? (
    <TouchableOpacity style={fullWidthButtonWrapper[buttonType]} onPress={onPress} underlayColor="transparent">
      {children}
    </TouchableOpacity>
  ) : children ? (
    <TouchableOpacity style={buttonWrapper[buttonType]} onPress={onPress} underlayColor="transparent">
      {children}
    </TouchableOpacity>
  ) : half ? (
    <TouchableOpacity style={halfButtonWrapper[buttonType]} onPress={onPress} underlayColor="transparent">
      <Text style={buttonLabel[buttonType]}>{buttonText}</Text>
    </TouchableOpacity>
  ) : fullWidth ? (
    <TouchableOpacity style={fullWidthButtonWrapper[buttonType]} onPress={onPress} underlayColor="transparent">
      <Text style={buttonLabel[buttonType]}>{buttonText}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={buttonWrapper[buttonType]} onPress={onPress} underlayColor="transparent">
      <Text style={buttonLabel[buttonType]}>{buttonText}</Text>
    </TouchableOpacity>
  ))

export default Button
