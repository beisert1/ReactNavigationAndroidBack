// Reg ID Setter/Getter
let myRegID = null
export function getRegID() {
  return myRegID
}
export function setRegID(val) {
  myRegID = val
}

// Environment Setter/Getter
let env, sharedURL, serviceURL = null
export function getEnvironment() {
  return env
}
export function getSharedURL() {
  return sharedURL
}
export function getServiceURL() {
  return serviceURL
}
export function setEnvironment(val) {
  env = val
  if (env === "staging") {
    sharedURL = "https://www.mysstaging.com/MYS_Shared"
    serviceURL = "https://www.mysstaging.com/MYS_Shared/cfc/Floorplan/mobileapp_v4_0.cfc"
  } else {
    sharedURL = "https://www.mapyourshow.com/MYS_Shared"
    serviceURL = "https://www.mapyourshow.com/MYS_Shared/cfc/Floorplan/mobileapp_v4_0.cfc"
  }
}

// Current Tab Setter/Getter
let currTabIndex = 0
export function getCurrentTab() {
  return currTabIndex
}
export function setCurrentTab(val) {
  currTabIndex = val
}

// TabList Setter/Getter
let tabList = []
export function getTabList() {
  return tabList
}
export function setTabList(val) {
  tabList = val
}

// isSyncing Setter/Getter
let isSyncing = false
export function getSyncStatus() {
  return isSyncing
}
export function setSyncStatus(val) {
  isSyncing = val
}

// searchText Setter/Getter
let searchText = null
export function getSearchText() {
  return searchText
}
export function setSearchText(val) {
  searchText = val
}

// tabName Setter/Getter
let tabName = null
export function getTabName() {
  return tabName
}
export function setTabName(val) {
  tabName = val
}

// mobile commands Setter/Getter
const mobileCommands = {}
export function getMobileCommands() {
  return mobileCommands
}

export function setMobileCommands(commands) {
  commands.forEach(command => {
    mobileCommands[command.FunctionName] = command.Command
  })
}

// image loading flag
let imageLoadingStatus = false
export function getImageLoading() {
  return imageLoadingStatus
}

export function setImageLoading(val) {
  imageLoadingStatus = val
}

// drill card setter/getter
let lastDrill = [null, ""]
export function getLastDrill() {
  return lastDrill
}
export function setLastDrill(val) {
  lastDrill = val
}

// text card setter/getter
let lastText = [null, ""]
export function getLastText() {
  return lastText
}
export function setLastText(val) {
  lastText = val
}

// discover loading flag
let discoverLoadingStatus = false
export function getDiscoverDone() {
  return discoverLoadingStatus
}

export function setDiscoverDone(val) {
  discoverLoadingStatus = val
}

// discover image array
let discoverImages = []
export function getDiscoverImages() {
  return discoverImages
}

export function setDiscoverImages(val) {
  discoverImages = val
}

// failed discover image array
let failedDiscoverImages = []
export function getFailedDiscoverImages() {
  return failedDiscoverImages
}

export function setFailedDiscoverImages(val) {
  failedDiscoverImages = val
}

// hall image sync flag
let hallSyncComplete = false
export function getHallSyncStatus() {
  return hallSyncComplete
}

export function setHallSyncStatus(val) {
  hallSyncComplete = val
}

// showDates Getter
const showDates = [
  "2018-09-10 00:00:00",
  "2018-09-11 00:00:00",
  "2018-09-12 00:00:00",
  "2018-09-13 00:00:00",
  "2018-09-14 00:00:00",
  "2018-09-15 00:00:00",
]
export function getShowDates() {
  return showDates
}
