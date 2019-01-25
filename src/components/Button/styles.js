import { globalColors, themeColors } from "../../themes/colors"
import { fontSizes } from "../../themes/baseStyles"

const buttonWrapper = {
  primary: {
    alignItems: "center",
    backgroundColor: themeColors.primary,
    flexDirection: "row",
    height: 44,
    justifyContent: "center",
    margin: 10,
    width: "90%",
  },
  secondary: {
    alignItems: "center",
    backgroundColor: globalColors.white,
    borderColor: themeColors.primary,
    borderWidth: 1,
    flexDirection: "row",
    height: 44,
    justifyContent: "center",
    margin: 10,
    width: "90%",
  },
  quiet: {
    backgroundColor: "transparent",
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  directions: {
    alignItems: "center",
    backgroundColor: themeColors.primary,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    width: "100%",
  },
  danger: {
    alignItems: "center",
    backgroundColor: globalColors.white,
    borderColor: globalColors.cinnabar,
    borderWidth: 1,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    width: "100%",
  },
}

const halfButtonWrapper = {
  primary: {
    alignItems: "center",
    backgroundColor: themeColors.primary,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    margin: 10,
    width: "45%",
  },
  secondary: {
    alignItems: "center",
    backgroundColor: globalColors.white,
    borderColor: themeColors.primary,
    borderWidth: 1,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    margin: 10,
    width: "45%",
  },
}

const fullWidthButtonWrapper = {
  primary: {
    alignItems: "center",
    backgroundColor: themeColors.primary,
    flexDirection: "row",
    height: 44,
    justifyContent: "center",
    margin: 10,
    width: "100%",
  },
  secondary: {
    alignItems: "center",
    backgroundColor: globalColors.white,
    borderColor: themeColors.primary,
    borderWidth: 1,
    flexDirection: "row",
    height: 44,
    justifyContent: "center",
    margin: 10,
    width: "100%",
  },
  quiet: {
    backgroundColor: "transparent",
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  directions: {
    alignItems: "center",
    backgroundColor: themeColors.primary,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    width: "100%",
  },
  danger: {
    alignItems: "center",
    backgroundColor: globalColors.white,
    borderColor: globalColors.cinnabar,
    borderWidth: 1,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    width: "100%",
  },
  info: {
    alignItems: "center",
    backgroundColor: globalColors.boulder,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    width: "100%",
  },
}

const buttonLabel = {
  primary: {
    color: globalColors.white,
    fontSize: fontSizes.normal,
  },
  secondary: {
    color: themeColors.primary,
    fontSize: fontSizes.normal,
  },
  quiet: {
    color: globalColors.white,
    fontSize: fontSizes.normal,
  },
  directions: {
    color: globalColors.white,
    fontSize: fontSizes.normal,
  },
  danger: {
    color: globalColors.cinnabar,
    fontSize: fontSizes.normal,
  },
  info: {
    color: globalColors.white,
    fontSize: fontSizes.normal,
  },
}

export { buttonWrapper, buttonLabel, halfButtonWrapper, fullWidthButtonWrapper }
