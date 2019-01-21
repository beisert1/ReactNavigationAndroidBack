import { globalColors, themeColors } from "../../themes/colors"
import { fontSizes } from "../../themes/baseStyles"

export default {
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 0,
    backgroundColor: globalColors.white,
    shadowColor: "rgba(0, 0, 0, 0)",
    borderTopWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  tabButton: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  tabButtonText: {
    fontSize: fontSizes.extraSmall,
    paddingTop: 5,
    textAlign: "center",
    color: globalColors.boulder,
  },
  selectedTab: {
    color: themeColors.accent,
  },
}
