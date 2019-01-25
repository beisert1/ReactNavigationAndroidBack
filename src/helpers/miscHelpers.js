import moment from "moment"
import { Dimensions, Platform } from "react-native"
import { SHOW_ID } from "../config/constants"

export function isIphoneX() {
  const d = Dimensions.get("window")
  const { height, width } = d

  return (
    Platform.OS === "ios" &&
    (height === 812 || width === 812)
  )
}

export function getUnique(filteredLayers) {
  const temp = {}
  const unique = []
  for (let i = 0, l = filteredLayers.length; i < l; ++i) {
    if (!temp.hasOwnProperty(filteredLayers[i])) {
      unique.push(filteredLayers[i])
      temp[filteredLayers[i]] = 1
    }
  }
  return unique
}

export function indexOfMax(array) {
  let max = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i].length > array[max].length) {
      max = i
    }
  }
  return max
}

export function indexOfMin(array, lastIndex) {
  let min = 0
  const maxWidth = 15
  const dupeList = []
  let comboSize
  let smallestCombo

  for (let i = 0; i < array.length - 1; i++) {
    comboSize = array[i].length + array[i + 1].length + 1
    if (smallestCombo === undefined) {
      smallestCombo = comboSize
      min = i
    }
    if (comboSize < smallestCombo) {
      smallestCombo = comboSize
      min = i
    }
  }

  if (lastIndex === undefined || lastIndex !== min) {
    if (smallestCombo <= maxWidth) {
      return min
    } else {
      return -1
    }
  } else {
    if (lastIndex < array.length - 1) {
      const newCombo = `${array[min]} ${array[min + 1]}`
      const oldCombo = `${array[lastIndex]} ${array[lastIndex + 1]}`
      if (oldCombo.length === newCombo.length) {
        for (let x = 0; x < array.length - 1; x++) {
          const tempCombo = `${array[x]} ${array[x + 1]}`
          if (tempCombo.length === newCombo.length) {
            dupeList.push(x)
          }
        }
        for (let y = 0; y < dupeList.length; y++) {
          if (dupeList[y] === lastIndex) {
            min = dupeList[y + 1]
            break
          }
        }
      }
    }

    if (dupeList.length > 1 && lastIndex !== dupeList[dupeList.length - 1]) {
      return min
    } else if (array[min + 1] !== undefined) {
      let nextMin = min
      let minCombo = array[min].length + array[min + 1].length + 1
      let nextCombo = minCombo
      for (let a = 0; a < array.length - 1; a++) {
        comboSize = array[a].length + array[a + 1].length + 1
        if (comboSize < minCombo) {
          nextCombo = minCombo
          minCombo = comboSize
          nextMin = a
        } else if (comboSize < nextCombo) {
          nextCombo = comboSize
          nextMin = a
        }
      }

      if (min !== nextMin) {
        return nextMin
      } else {
        return min
      }
    } else {
      return -1
    }
  }
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}

export function rotatePoint(pointX, pointY, originX, originY, angle) {
  const newAngle = -angle * Math.PI / 180.0
  return [Math.cos(newAngle) * (pointX - originX) - Math.sin(newAngle) * (pointY - originY) + originX, Math.sin(newAngle) * (pointX - originX) + Math.cos(newAngle) * (pointY - originY) + originY]
}

export const reverseNumber = (num, min, max) => max + min - num

export const getImageSource = name => `https://www.mapyourshow.com/MYS_Shared/${SHOW_ID}/mobile/drillbgs/${name}`

export const createSQLCommand = (query, payload) => {
  const len = payload.length
  let command = query
  for (let i = 0; i < len; i++) {
    command = String(command).replace(new RegExp(payload[i].param, "g"), payload[i].val)
  }
  return command
}

export const getNowDateString = () => {
  const date = new Date()
  const returnDate = moment(date).format("YYYY-MM-DD HH:mm:ss")
  return returnDate
}

export const dateFormatter = date => {
  // remove time
  const d = date.replace(/ .*/, "")

  // format date
  const formattedDate = new Date(d)
  const newDate = formattedDate.toJSON()
  let finalDate = new Date(newDate).toUTCString()

  // format new date
  let lastIndex = finalDate.lastIndexOf(" ")
  finalDate = finalDate.substring(0, lastIndex)
  lastIndex = finalDate.lastIndexOf(" ")
  finalDate = finalDate.substring(0, lastIndex)
  lastIndex = finalDate.lastIndexOf(" ")
  finalDate = finalDate.substring(0, lastIndex)

  const dayOfWeek = finalDate.replace(/ .*/, "")
  let newDayOfWeek = dayOfWeek

  switch (dayOfWeek) {
    case "Mon,":
      newDayOfWeek = "Monday,"
      break
    case "Tue,":
      newDayOfWeek = "Tuesday,"
      break
    case "Wed,":
      newDayOfWeek = "Wednesday,"
      break
    case "Thu,":
      newDayOfWeek = "Thursday,"
      break
    case "Fri,":
      newDayOfWeek = "Friday,"
      break
    case "Sat,":
      newDayOfWeek = "Saturday,"
      break
    case "Sun,":
      newDayOfWeek = "Sunday,"
      break
    default:
      // do nothing
      break
  }

  finalDate = finalDate.replace(dayOfWeek, newDayOfWeek)

  let tempDate = finalDate.replace(newDayOfWeek, "")

  tempDate = tempDate.trim()

  let tempDay = tempDate.replace(/ .*/, "")
  tempDay = tempDay.trim()

  let tempMonth = tempDate.split(" ").splice(-1)[0]
  tempMonth = tempMonth.trim()

  switch (tempMonth) {
    case "Jan":
      tempMonth = "January"
      break
    case "Feb":
      tempMonth = "February"
      break
    case "Mar":
      tempMonth = "March"
      break
    case "Apr":
      tempMonth = "April"
      break
    case "May":
      tempMonth = "May"
      break
    case "Jun":
      tempMonth = "June"
      break
    case "Jul":
      tempMonth = "July"
      break
    case "Aug":
      tempMonth = "August"
      break
    case "Sep":
      tempMonth = "September"
      break
    case "Oct":
      tempMonth = "October"
      break
    case "Nov":
      tempMonth = "November"
      break
    case "Dec":
      tempMonth = "December"
      break
    default:
      // do nothing
      break
  }

  const newFinalDate = `${newDayOfWeek} ${tempMonth} ${tempDay}`

  return newFinalDate
}

export const formatDate = date => {
  if (typeof (date) !== "undefined") {
    const formattedDate = moment(date).format("dddd, MMM Do @ h:mm a")
    return formattedDate
  }
}

export const formatSessionSubtitle = (startTime, endTime) => {
  if ((startTime !== undefined && startTime !== null) && (endTime !== undefined || endTime !== null)) {
    const formattedDate = moment(startTime).format("dddd, MMM Do @ h:mm a")
    const formattedEndTime = moment(endTime).format("h:mm a")
    const formattedString = `${formattedDate} - ${formattedEndTime}`
    return formattedString
  } else if ((startTime !== undefined && startTime !== null)) {
    const formattedDate = moment(startTime).format("dddd, MMM Do @ h:mm a")
    return formattedDate
  }
}

export function isTiltedRectangle(segments) {
  if (segments.length === 5) {
    if (segments[0][0] === segments[1][0] || segments[0][1] === segments[1][1]) {
      return false
    } else {
      return (isOrthogonal(segments[0][0], segments[0][1], segments[1][0], segments[1][1], segments[2][0], segments[2][1]) &&
      isOrthogonal(segments[1][0], segments[1][1], segments[2][0], segments[2][1], segments[3][0], segments[3][1]) &&
      isOrthogonal(segments[2][0], segments[2][1], segments[3][0], segments[3][1], segments[0][0], segments[0][1]))
    }
  }
  return false
}

export function isRectangle(segments) {
  if (segments.length === 5) {
    return (isOrthogonal(segments[0][0], segments[0][1], segments[1][0], segments[1][1], segments[2][0], segments[2][1]) &&
    isOrthogonal(segments[1][0], segments[1][1], segments[2][0], segments[2][1], segments[3][0], segments[3][1]) &&
    isOrthogonal(segments[2][0], segments[2][1], segments[3][0], segments[3][1], segments[0][0], segments[0][1]))
  }
  return false
}

// tests if angle abc is a right angle
function isOrthogonal(ax, ay, bx, by, cx, cy) {
  return ((bx - ax) * (bx - cx) + (by - ay) * (by - cy) < 0.01 && (bx - ax) * (bx - cx) + (by - ay) * (by - cy) > -0.01)
}

export function calculateHorizVertSegments(pointsArray) {
  let horizSegments = []
  let vertSegments = []
  const diagonalSegments = []
  const len = pointsArray.length - 1
  for (let i = 0; i < len; i++) {
    const point1 = pointsArray[i].split(",")
    const x1 = point1[0]
    const y1 = point1[1]

    const point2 = pointsArray[i + 1].split(",")
    const x2 = point2[0]
    const y2 = point2[1]

    // This means it's a horizontal line segment
    if (Math.round(y1) === Math.round(y2)) {
      horizSegments.push({
        x1: Math.round(x1),
        y1: Math.round(y1),
        x2: Math.round(x2),
        y2: Math.round(y2),
      })
    } else if (Math.round(x1) === Math.round(x2)) {
      vertSegments.push({
        x1: Math.round(x1),
        y1: Math.round(y1),
        x2: Math.round(x2),
        y2: Math.round(y2),
      })
    } else {
      diagonalSegments.push(1)
    }
  }

  horizSegments = cleanSegmentArray(horizSegments, false)
  vertSegments = cleanSegmentArray(vertSegments, true)


  return [horizSegments, vertSegments, diagonalSegments]
}

function cleanSegmentArray(segments, isVert) {
  if (!segments || segments.length === 0) {
    return []
  } else if (segments.length === 1) {
    return segments
  }

  segments.sort((a, b) => {
    if (isVert) {
      return a.x1 - b.x1
    } else {
      return a.y1 - b.y1
    }
  })

  return [segments[0], segments[segments.length - 1]]
}

export function cleanHTML(html) {
  if (html) {
    let content = html

    content = content.replace(new RegExp("&#160;", "g"), "<br />")
    content = content.replace(new RegExp("&#13;", "g"), "<br />")
    content = content.replace(new RegExp("&rsquo;", "g"), "'")
    content = content.replace(new RegExp("&#8217;", "g"), "'")
    content = content.replace(new RegExp("&#39;", "g"), "'")
    content = content.replace(new RegExp("&#8482;", "g"), "™")
    content = content.replace(new RegExp("&amp;", "g"), "&")
    content = content.replace(new RegExp("&#38;", "g"), "&")
    content = content.replace(new RegExp("&reg;", "g"), "®")
    content = content.replace(new RegExp("&nbsp;", "g"), " ")
    content = content.replace(new RegExp("&mdash;", "g"), "—")
    content = content.replace(new RegExp("&#8212;", "g"), "—")
    content = content.replace(new RegExp("&#8226;", "g"), "•")
    content = content.replace(new RegExp("&#8221;", "g"), "”")
    content = content.replace(new RegExp("&#8211;", "g"), "–")
    content = content.replace(new RegExp("&#248;", "g"), "ø")
    content = content.replace(new RegExp("&#34;", "g"), "\"")
    content = content.replace(new RegExp("&#8220;", "g"), "“")
    content = content.replace(new RegExp("&#60;", "g"), "<")
    content = content.replace(new RegExp("&#174;", "g"), "®")
    content = content.replace(new RegExp("&#8243;", "g"), "″")

    return content
  }
}
