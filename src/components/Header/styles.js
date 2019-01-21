import { globalColors, themeColors } from "../../themes/colors"
import { fontSizes } from "../../themes/baseStyles"

export default {
  textStyle: {
    color: globalColors.white,
    fontSize: 16, // Not a base size, too small for normal, too big for large
    letterSpacing: 1,
    textAlign: "center",
  },
  searchContainer: {
    alignItems: "center",
    backgroundColor: themeColors.headerColor,
    elevation: 2,
    flexDirection: "row",
    height: 60,
    paddingHorizontal: 18,
    paddingTop: 15,
  },
  searchSection: {
    alignItems: "center",
    backgroundColor: globalColors.white,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 25,
    paddingLeft: 5,
  },
  searchIcon: {
    padding: 5,
  },
  searchInput: {
    backgroundColor: globalColors.white,
    borderRadius: 10,
    color: globalColors.codGray,
    flex: 1,
    fontSize: fontSizes.normal,
    padding: 5,
  },
  headerTextContainer: {
    flex: 4,
    padding: 12,
  },
  leftItemContainer: {
    alignItems: "center",
    flex: 1.2,
    flexDirection: "row",
    paddingLeft: 12,
    paddingVertical: 10,
  },
  rightItemContainer: {
    alignItems: "flex-end",
    flex: 1.2,
    paddingRight: 12,
    paddingVertical: 10,
  },
  viewStyle: {
    alignItems: "center",
    backgroundColor: themeColors.headerColor,
    elevation: 2,
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    paddingTop: 15,
  },
  backTextStyle: {
    color: globalColors.white,
    fontSize: fontSizes.large,
  },
  skipTextStyle: {
    color: globalColors.white,
    fontSize: fontSizes.large,
  },
}
