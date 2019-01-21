import { globalColors, themeColors } from "../../themes/colors"
import { fontSizes } from "../../themes/baseStyles"

export default {
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    backgroundColor: globalColors.white,
    justifyContent: "center",
    marginTop: 15,
    paddingTop: 30,
    paddingBottom: 10,
  },
  menuContainer: {
    backgroundColor: themeColors.drawerBGColor,
    flex: 1,
  },
  menuItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12.5,
  },
  menuText: {
    color: globalColors.white,
    fontSize: fontSizes.large,
  },
  subMenuText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: fontSizes.extraSmall,
  },
}
