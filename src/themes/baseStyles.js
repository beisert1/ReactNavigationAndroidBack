import { globalColors, themeColors } from "./colors"

const fontSizes = {
  extraSmall: 10,
  small: 13,
  normal: 15,
  large: 17,
  extraLarge: 24,
}

const baseStyles = {
  bgView: {
    backgroundColor: globalColors.white,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: themeColors.headerColor,
  },
  primaryTextStyling: {
    color: globalColors.white,
  },
  sectionContentTitle: {
    color: globalColors.codGray,
    fontSize: fontSizes.small,
    fontStyle: "normal",
    fontWeight: "normal",
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 20,
  },
  sectionContentContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  sectionListTitle: {
    color: globalColors.codGray,
    fontSize: fontSizes.small,
    fontStyle: "normal",
    fontWeight: "normal",
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionListContainer: {
    marginBottom: 20,
  },
  activityIndicatorContainer: {
    // position: "absolute",
    // top: "40%",
    // left: 0,
    // right: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
    flex: 1,
  },
}

export { baseStyles, fontSizes }
