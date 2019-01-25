// Tyler Holhubner -- 2/16/18
// Converts booth point list and startXY to a valid feature collection
import { polygon, point, featureCollection } from "@turf/helpers"
import { largestRect } from "d3plus-shape"

import {
  meters2degrees,
  bbox,
} from "./conversions"
import {
  rotatePoint,
  indexOfMax,
  indexOfMin,
  isTiltedRectangle,
  isRectangle,
  calculateHorizVertSegments,
} from "./miscHelpers"
import { globalColors, themeColors } from "../themes/colors"
import { UNIT_SCALE_FACTOR } from "../config/constants"

let finalBoothLabels
let finalExhLabels
let finalBoothData
let selectedBoothPoint
let destinationBoothPoint
let originBoothPoint
let returnWithSelectedBooth = false
let returnWithDirectionsBooths = false

export function converDataForBooths(hallID, boothList, hallScale, finalScale, selectedBooth, originBooth, destinationBooth) {
  finalBoothData = null

  const boothGeoFeatures = []
  const boothLabelFeatures = []
  const exhLabelFeatures = []
  const len = boothList.length
  let indexOfSelectedBooth = 0
  let boothIndex = 0
  if (hallID === "OO" && originBooth && destinationBooth) {
    if (originBooth !== undefined && originBooth !== null && destinationBooth !== undefined && destinationBooth !== null) {
      originBoothPoint = point(meters2degrees(originBooth.x, -originBooth.y), {
        name: "Start",
      })
      destinationBoothPoint = point(meters2degrees(destinationBooth.x, -destinationBooth.y), {
        name: "End",
      })
      return [null, null, null, originBoothPoint, destinationBoothPoint]
    }
  } else {
    for (let i = 0; i < len; i++) {
      const item = boothList.item(i)
      if (item.ObjectType === "booth" || item.ObjectType === "room" || item.ObjectType === "clickArea") {
        boothIndex += 1
        const exhName = item.ExhName
        const boothnum = item.Booth
        const boothType = item.ObjectType
        const boothDisplay = item.boothdisplay
        let boothRotation = item.Rotate
        const startPoint = item.StartXY
        const startArray = startPoint.split(",")
        const startX = startArray[0]
        const startY = startArray[1]
        const points = item.Points
        const pointsArray = points.split("|")

        let boothGeomFeature
        let externalExtentUnrotated
        let externalExtentRotated
        let internalExtentUnrotated
        let internalExtentRotated
        let labelInternalExtentUnrotated
        let centerObj
        let boothLabelFeature
        let exhLabelFeature

        const segments = []
        for (let j = 0; j < pointsArray.length; j++) {
          const indivPoint = pointsArray[j].split(",")
          const pointX = indivPoint[0]
          const pointY = indivPoint[1]
          const adjustedX = Math.abs(pointX) + Math.abs(startX)
          const adjustedY = Math.abs(pointY) + Math.abs(startY)
          segments.push([adjustedX, adjustedY])
        }

        if (pointsArray.length === 5 && isRectangle(segments)) {
          if (boothRotation === 0 && isTiltedRectangle(segments)) {
            let deltaY, deltaX
            let edgeSum = 0
            const segLen = segments.length
            for (let x = 0; x < segLen; x++) {
              edgeSum += (segments[x + 1][0] - segments[x][0] * (segments[x + 1] + segments[x][1]))
            }

            if (edgeSum > 0) {
              deltaY = segments[1][1] - segments[0][1]
              deltaX = segments[1][0] - segments[0][0]
            } else {
              deltaY = segments[3][1] - segments[0][1]
              deltaX = segments[3][0] - segments[0][0]
            }

            const angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI

            for (let y = 1; y < segLen; y++) {
              segments[y] = rotatedPoint(segments[y][0], segments[y][1], segments[0][0], segments[0][1], angleInDegrees)
            }

            const externalUnrotatedPolygon = polygon([segments])
            externalExtentUnrotated = bbox(externalUnrotatedPolygon)

            boothRotation = -angleInDegrees

            if (boothRotation !== 0) {
              const rotatedSegments = []
              for (let z = 0; z < segLen; z++) {
                rotatedSegments.push(rotatePoint(segments[z][0], segments[z][1], externalExtentUnrotated[0], externalExtentUnrotated[1], Number(boothRotation)))
              }

              boothGeomFeature = polygon([rotatedSegments])
              externalExtentRotated = bbox(boothGeomFeature)
            } else {
              boothGeomFeature = polygon([segments])
              externalExtentRotated = externalExtentUnrotated
            }

            internalExtentUnrotated = externalExtentUnrotated
            internalExtentRotated = externalExtentRotated
          } else {
            const externalUnrotatedPolygon = polygon([segments])
            externalExtentUnrotated = bbox(externalUnrotatedPolygon)

            const segLen = segments.length
            if (boothRotation !== 0) {
              const rotatedSegments = []
              for (let z = 0; z < segLen; z++) {
                rotatedSegments.push(rotatePoint(segments[z][0], segments[z][1], externalExtentUnrotated[0], externalExtentUnrotated[1], Number(boothRotation) * -1))
              }

              boothGeomFeature = polygon([rotatedSegments])
              externalExtentRotated = bbox(boothGeomFeature)
            } else {
              boothGeomFeature = polygon([segments])
              externalExtentRotated = externalExtentUnrotated
            }

            internalExtentUnrotated = externalExtentUnrotated
            internalExtentRotated = externalExtentRotated
          }
        } else { // WE GOT AN IRREGULAR HERE
          const horizVertSegments = calculateHorizVertSegments(pointsArray)
          const horizSegments = horizVertSegments[0]
          const vertSegments = horizVertSegments[1]
          const diagonalSegments = horizVertSegments[2]
          const horizLen = horizSegments.length
          const vertLen = vertSegments.length
          const diagLen = diagonalSegments.length
          let minYDist
          let maxYDist
          let minXDist
          let maxXDist
          let horizRatio = 0
          let vertRatio = 0

          if (horizLen === 2 && vertLen === 2 && pointsArray.length === 7 && diagLen === 0) { // For L shaped booth
            if (horizLen > 1) {
              minYDist = Math.abs(horizSegments[0].x2 - horizSegments[0].x1)
              maxYDist = Math.abs(horizSegments[1].x2 - horizSegments[1].x1)

              if (minYDist > maxYDist) {
                horizRatio = minYDist / maxYDist
              } else {
                horizRatio = maxYDist / minYDist
              }
            }

            if (vertLen > 1) {
              minXDist = Math.abs(vertSegments[0].y2 - vertSegments[0].y1)
              maxXDist = Math.abs(vertSegments[1].y2 - vertSegments[1].y1)

              if (minXDist > maxXDist) {
                vertRatio = minXDist / maxXDist
              } else {
                vertRatio = maxXDist / minXDist
              }
            }

            const internalRectPointsArray = []
            if (vertRatio < horizRatio) {
              if (minXDist < maxXDist) {
                internalRectPointsArray.push(`${vertSegments[0].x1},${vertSegments[0].y1}`)
                internalRectPointsArray.push(`${vertSegments[1].x2},${vertSegments[0].y1}`)
                internalRectPointsArray.push(`${vertSegments[1].x1},${vertSegments[0].y2}`)
                internalRectPointsArray.push(`${vertSegments[0].x1},${vertSegments[0].y2}`)
                internalRectPointsArray.push(`${vertSegments[0].x1},${vertSegments[0].y1}`)
              } else {
                internalRectPointsArray.push(`${vertSegments[0].x1},${vertSegments[1].y2}`)
                internalRectPointsArray.push(`${vertSegments[1].x2},${vertSegments[1].y2}`)
                internalRectPointsArray.push(`${vertSegments[1].x2},${vertSegments[1].y1}`)
                internalRectPointsArray.push(`${vertSegments[0].x1},${vertSegments[1].y1}`)
                internalRectPointsArray.push(`${vertSegments[0].x1},${vertSegments[1].y2}`)
              }
            } else {
              if (minYDist < maxYDist) {
                internalRectPointsArray.push(`${horizSegments[0].x1},${horizSegments[0].y1}`)
                internalRectPointsArray.push(`${horizSegments[0].x2},${horizSegments[0].y2}`)
                internalRectPointsArray.push(`${horizSegments[0].x2},${horizSegments[1].y1}`)
                internalRectPointsArray.push(`${horizSegments[0].x1},${horizSegments[1].y2}`)
                internalRectPointsArray.push(`${horizSegments[0].x1},${horizSegments[0].y1}`)
              } else {
                internalRectPointsArray.push(`${horizSegments[1].x2},${horizSegments[0].y1}`)
                internalRectPointsArray.push(`${horizSegments[1].x1},${horizSegments[0].y2}`)
                internalRectPointsArray.push(`${horizSegments[1].x1},${horizSegments[1].y1}`)
                internalRectPointsArray.push(`${horizSegments[1].x2},${horizSegments[1].y2}`)
                internalRectPointsArray.push(`${horizSegments[1].x2},${horizSegments[0].y1}`)
              }
            }

            const internalRectSegments = []
            const intRectLen = internalRectPointsArray.length
            for (let x = 0; x < intRectLen; x++) {
              const indivPoint = internalRectPointsArray[x].split(",")
              const pointX = indivPoint[0]
              const pointY = indivPoint[1]
              const trueX = (Math.abs(startX) + Math.abs(pointX))
              const trueY = (Math.abs(startY) + Math.abs(pointY))
              internalRectSegments.push([trueX, trueY])
            }

            const externalUnrotatedPolygon = polygon([segments])
            externalExtentUnrotated = bbox(externalUnrotatedPolygon)
            const internalUnrotatedPolygon = polygon([internalRectSegments])
            internalExtentUnrotated = bbox(internalUnrotatedPolygon)

            const segLen = segments.length
            if (boothRotation !== 0) {
              const rotatedSegments = []
              for (let y = 0; y < segLen; y++) {
                rotatedSegments.push(rotatePoint(segments[y][0], segments[y][1], externalExtentUnrotated[0], externalExtentUnrotated[1], Number(boothRotation)))
              }

              boothGeomFeature = polygon([rotatedSegments])
              externalExtentRotated = bbox(boothGeomFeature)

              const rotateInternalSegments = []
              for (let z = 0; z < internalRectSegments.length; z++) {
                rotateInternalSegments.push(rotatePoint(internalRectSegments[z][0], internalRectSegments[z][1], internalExtentUnrotated[0], internalExtentUnrotated[1], Number(boothRotation)))
              }

              const internalRotatedPolygon = polygon([rotateInternalSegments])
              internalExtentRotated = bbox(internalRotatedPolygon)
            } else {
              boothGeomFeature = polygon([segments])
              externalExtentRotated = externalExtentUnrotated
              internalExtentRotated = internalExtentUnrotated
            }
          } else { // For standard Irregulars
            const externalUnrotatedPolygon = polygon([segments])
            externalExtentUnrotated = bbox(externalUnrotatedPolygon)

            const segLen = segments.length
            const rotatedSegments = []
            if (boothRotation !== 0) {
              for (let x = 0; x < segLen; x++) {
                rotatedSegments.push(rotatePoint(segments[x][0], segments[x][1], segments[0][0], segments[0][1], Number(boothRotation) * -1))
              }
              boothGeomFeature = polygon([rotatedSegments])
              externalExtentRotated = bbox(boothGeomFeature)
            } else {
              boothGeomFeature = polygon([segments])
              externalExtentRotated = externalExtentUnrotated
            }

            const options = {}
            if (diagLen === 0) {
              options.angle = [0, -90]
              options.nTries = 100
            } else {
              options.angle = [0, -90, -85, -80, -75, -70, -65, -60, -55, -50, -45, -40, -35, -30, -25, -20, -15, -10, -5, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]
            }

            if (rotatedSegments.length > 0) {
              centerObj = largestRect(rotatedSegments, options)
            } else {
              centerObj = largestRect(segments, options)
            }

            if (centerObj) {
              labelInternalExtentUnrotated = [centerObj.cx - centerObj.width / 2, centerObj.cy - centerObj.height / 2, centerObj.cx + centerObj.width / 2, centerObj.cy + centerObj.height / 2]
            }

            internalExtentUnrotated = externalExtentUnrotated
            internalExtentRotated = externalExtentRotated
          }
        }

        boothGeomFeature.properties.id = item.Booth
        boothGeomFeature.properties.exhName = exhName
        boothGeomFeature.properties.exhID = item.ExhID
        boothGeomFeature.properties.cornerPeel = item.cornerpeel
        boothGeomFeature.properties.icon = "cornerpeel"
        boothGeomFeature.properties.featuretype = item.ObjectType
        if (item.ObjectType === "clickArea") {
          boothGeomFeature.properties.hallID = item.Value
        }

        let rotatedPoint = rotatePoint(
          internalExtentUnrotated[0],
          internalExtentUnrotated[1],
          externalExtentUnrotated[0],
          externalExtentUnrotated[1],
          Number(boothRotation),
        )

        if (!labelInternalExtentUnrotated) {
          labelInternalExtentUnrotated = internalExtentUnrotated
        }

        const boothWidth = (labelInternalExtentUnrotated[2] - labelInternalExtentUnrotated[0])
        const boothHeight = (labelInternalExtentUnrotated[3] - labelInternalExtentUnrotated[1])
        const charCount = boothnum.length
        let fontSize

        const widthSize = (0.90 * boothWidth / charCount) * finalScale * hallScale / 100
        const heightSize = (0.10 * boothHeight) * finalScale * hallScale / 100

        if (widthSize < heightSize) {
          fontSize = widthSize
        } else {
          fontSize = heightSize
        }

        boothGeomFeature.properties.width = widthSize
        boothGeomFeature.properties.height = heightSize
        boothGeomFeature.properties.boothWidth = boothWidth
        boothGeomFeature.properties.boothHeight = boothHeight

        if (centerObj) {
          boothGeomFeature.properties.centerObj = centerObj
          if (boothType === "room" || boothnum === null) {
            boothLabelFeature = point([centerObj.cx, centerObj.cy], {
              name: "",
            })
          } else {
            const rotatedPoints = rotatePoint(labelInternalExtentUnrotated[0], labelInternalExtentUnrotated[1], centerObj.cx, centerObj.cy, Number(boothRotation))
            boothLabelFeature = point([rotatedPoints[0], rotatedPoints[1]], {
              name: boothDisplay,
            })
          }
        } else {
          if (boothType === "room") {
            boothLabelFeature = point([(internalExtentRotated[2] + internalExtentRotated[0]) / 2, (internalExtentRotated[3] + internalExtentRotated[1]) / 2], {
              name: "",
            })
          } else {
            boothLabelFeature = point(rotatePoint(labelInternalExtentUnrotated[0], labelInternalExtentUnrotated[1], externalExtentUnrotated[0], externalExtentUnrotated[1], Number(boothRotation)), {
              name: boothDisplay,
            })
          }
        }

        if (boothLabelFeature) {
          boothLabelFeature.properties.featuretype = "symbol"
          boothLabelFeature.properties.boothPixelWidth = boothWidth
          boothLabelFeature.properties.boothPixelHeight = boothHeight
          boothLabelFeature.properties.boothDisplay = boothDisplay
          boothLabelFeature.properties.textSize = fontSize
          boothLabelFeature.id = boothDisplay
        }

        let exhDisplay
        if (boothType === "booth") {
          if (exhName && exhName.length === 0) {
            exhDisplay = ""
          } else {
            exhDisplay = exhName
          }
        } else if (boothType === "room") {
          exhDisplay = boothnum
        }

        if (exhDisplay && exhDisplay.length > 0) {
          if (centerObj) {
            exhLabelFeature = point([centerObj.cx, centerObj.cy], {
              name: exhDisplay,
            })
          } else {
            exhLabelFeature = point([(internalExtentRotated[2] + internalExtentRotated[0]) / 2, (internalExtentRotated[3] + internalExtentRotated[1]) / 2], {
              name: exhDisplay,
            })
          }
          if (exhLabelFeature) {
            exhLabelFeature.properties.featuretype = "symbol"
            exhLabelFeature.properties.id = boothnum
            exhLabelFeature.properties.boothPixelWidth = boothWidth
            exhLabelFeature.properties.boothPixelHeight = boothHeight
            exhLabelFeature.properties.hallScale = hallScale
            exhLabelFeature.properties.finalScale = finalScale

            const fontAndName = getExhFont(exhLabelFeature)
            exhLabelFeature.properties.textSize = fontAndName[0]
            exhLabelFeature.properties.exhName = fontAndName[1]

            exhLabelFeatures.push(exhLabelFeature)
          }
        }

        if (boothGeomFeature !== undefined) {
          boothGeoFeatures.push(boothGeomFeature)
          boothLabelFeatures.push(boothLabelFeature)
        }

        if (selectedBooth !== undefined && selectedBooth !== null && boothnum === selectedBooth) {
          indexOfSelectedBooth = boothIndex
          if (boothType === "room") {
            selectedBoothPoint = point(boothLabelFeature.geometry.coordinates, {
              name: exhDisplay,
            })
          } else {
            selectedBoothPoint = point(exhLabelFeature.geometry.coordinates, {
              name: exhDisplay,
            })
          }
          returnWithDirectionsBooths = false
          returnWithSelectedBooth = true
          boothGeomFeature.properties.boothColor = globalColors.tomato
        } else if (originBooth !== undefined && originBooth !== null && boothnum === originBooth) {
          indexOfSelectedBooth = boothIndex
          if (boothType === "room") {
            originBoothPoint = point(boothLabelFeature.geometry.coordinates, {
              name: exhDisplay,
            })
          } else {
            originBoothPoint = point(exhLabelFeature.geometry.coordinates, {
              name: exhDisplay,
            })
          }
          returnWithSelectedBooth = false
          returnWithDirectionsBooths = true
          boothGeomFeature.properties.boothColor = themeColors.primary
        } else if (destinationBooth !== undefined && destinationBooth !== null && destinationBooth === boothnum) {
          if (boothType === "room") {
            destinationBoothPoint = point(boothLabelFeature.geometry.coordinates, {
              name: exhDisplay,
            })
          } else {
            destinationBoothPoint = point(exhLabelFeature.geometry.coordinates, {
              name: exhDisplay,
            })
          }
          returnWithSelectedBooth = false
          returnWithDirectionsBooths = true
          boothGeomFeature.properties.boothColor = globalColors.tomato
        } else {
          if (item.ObjectType === "clickArea") {
            boothGeomFeature.properties.boothColor = "rgba(52,52,52,alpha)"
          } else {
            if (item.regid === null) {
              boothGeomFeature.properties.boothColor = globalColors.boulder
              boothGeomFeature.properties.borderColor = globalColors.codGray
            } else {
              boothGeomFeature.properties.boothColor = themeColors.primary
              boothGeomFeature.properties.borderColor = globalColors.codGray
            }
          }
        }
      }
    }
  }

  const preConvertBooths = featureCollection(boothGeoFeatures)
  const preConvertBoothLabels = featureCollection(boothLabelFeatures)
  const preConvertExhLabels = featureCollection(exhLabelFeatures)

  finalBoothData = convertBoothData(preConvertBooths, hallScale, finalScale)
  finalBoothLabels = convertBoothLabels(preConvertBoothLabels, hallScale, finalScale)
  finalExhLabels = convertExhLabels(preConvertExhLabels, hallScale, finalScale)

  if (returnWithDirectionsBooths) {
    return [finalBoothData, finalBoothLabels, finalExhLabels, originBoothPoint, destinationBoothPoint]
  } else if (returnWithSelectedBooth) {
    return [finalBoothData, finalBoothLabels, finalExhLabels, selectedBoothPoint, indexOfSelectedBooth]
  } else {
    return [finalBoothData, finalBoothLabels, finalExhLabels]
  }
}

function convertBoothData(data, hallScale, finalScale) {
  const boothData = data
  for (let i = 0; i < boothData.features.length; i++) {
    for (let j = 0; j < boothData.features[i].geometry.coordinates.length; j++) {
      for (let k = 0; k < boothData.features[i].geometry.coordinates[j].length; k++) {
        const x = (boothData.features[i].geometry.coordinates[j][k][0])
        const y = (boothData.features[i].geometry.coordinates[j][k][1])
        const lonlat = convertMeters2Degrees(x, y, finalScale, hallScale / 100)
        const lon = lonlat[0]
        const lat = lonlat[1]
        boothData.features[i].geometry.coordinates[j][k][0] = lon
        boothData.features[i].geometry.coordinates[j][k][1] = lat
      }
    }
  }

  return boothData
}

function convertBoothLabels(data, hallScale, finalScale) {
  const boothLabelData = data
  for (let i = 0; i < boothLabelData.features.length; i++) {
    const x = (boothLabelData.features[i].geometry.coordinates[0])
    const y = (boothLabelData.features[i].geometry.coordinates[1])
    const lonlat = convertMeters2Degrees(x, y, finalScale, hallScale / 100)
    const lon = lonlat[0]
    const lat = lonlat[1]

    boothLabelData.features[i].geometry.coordinates[0] = lon
    boothLabelData.features[i].geometry.coordinates[1] = lat
  }

  return boothLabelData
}

function convertExhLabels(data, hallScale, finalScale) {
  const exhLabelData = data
  for (let i = 0; i < exhLabelData.features.length; i++) {
    const x = (exhLabelData.features[i].geometry.coordinates[0])
    const y = (exhLabelData.features[i].geometry.coordinates[1])
    const lonlat = convertMeters2Degrees(x, y, finalScale, hallScale / 100)
    const lon = lonlat[0]
    const lat = lonlat[1]

    exhLabelData.features[i].geometry.coordinates[0] = lon
    exhLabelData.features[i].geometry.coordinates[1] = lat
  }

  return exhLabelData
}

function getExhFont(feature) {
  let fullName = feature.properties.name
  const boothPixelWidth = feature.properties.boothPixelWidth
  const boothPixelHeight = feature.properties.boothPixelHeight
  const wordCount = fullName.split(" ").length
  const fullLength = fullName.length
  const maxWidth = 15
  const newLineStr = "\n"
  const ratio = 4 * (boothPixelHeight / boothPixelWidth)
  const hallScale = feature.properties.hallScale
  const finalScale = feature.properties.finalScale
  let res = ""
  let numLines
  let idealLines

  if (!fullName) {
    fullName = ""
  }
  if (fullName.length === 0) {
    fullName = ""
  }

  if (ratio > 1) {
    idealLines = Math.round(ratio)
  } else {
    idealLines = 1
  }

  if (fullLength <= maxWidth && wordCount === 1) {
    numLines = 1
  } else {
    for (let i = 0; i < wordCount; i++) {
      fullName = fullName.replace(" ", newLineStr)
    }
    res = fullName.split(newLineStr)

    for (let j = 0; j < res.length; j++) {
      if (res[j].length > maxWidth) {
        const breakPt = res[j].length / 2
        const tempWord = res[j].slice(breakPt, (res[j].length))
        res[j] = `${res[j].slice(0, breakPt)}-`
        res.splice(j + 1, 0, tempWord)
      }
    }

    if (idealLines < res.length) {
      let min = indexOfMin(res)

      for (let x = 0; x < res.length; x++) {
        if (min < 0 || res.length === idealLines) {
          break
        } else if (res[min + 1] !== undefined) {
          if (res[min + 1] !== undefined) {
            const tempWord = `${res[min]} ${res[min + 1]}`
            res[min] = ` ${res[min + 1]}`
            if (tempWord.length <= maxWidth) {
              res.splice(min, 2)
              res.splice(min, 0, tempWord)
            }
          }
        }
        min = indexOfMin(res, min)
      }

      let newName = ""
      for (let y = 0; y < res.length; y++) {
        if (y < (res.length - 1)) {
          newName = `${newName} ${res[y]}${newLineStr}`
        } else {
          newName = `${newName} ${res[y]}`
        }
      }
      fullName = newName
      numLines = (fullName.split(newLineStr).length)
    } else {
      let min = indexOfMin(res)
      if (min !== -1) {
        let max = indexOfMax(res)
        for (let a = 0; a < res.length; a++) {
          if (min < 0) {
            break
          } else if (res[min + 1] !== undefined) {
            const tempWord = `${res[min]} ${res[min + 1]}`
            if (tempWord.length <= res[max].length) {
              res.splice(min, 2)
              res.splice(min, 0, tempWord)
            }
          }
          min = indexOfMin(res, min)
          max = indexOfMax(res)
        }
      }

      let newName = ""
      for (let b = 0; b < res.length; b++) {
        if (b < (res.length - 1)) {
          newName = `${newName} ${res[b]}${newLineStr}`
        } else {
          newName = `${newName} ${res[b]}`
        }
      }

      fullName = newName
      numLines = (fullName.split(newLineStr).length)
    }
  }

  let numChars = 0
  const lines = fullName.split(newLineStr)
  for (let c = 0; c < lines.length; c++) {
    if (lines[c].length > numChars) {
      numChars = lines[c].length
    }
  }


  const widthSize = (0.90 * (boothPixelWidth / Math.max(9, numChars))) * finalScale * hallScale / 100
  const heightSize = (0.70 * (boothPixelHeight / (numLines * 1.25))) * finalScale * hallScale / 100

  let fontSize = 0
  if (widthSize < heightSize) {
    fontSize = widthSize
  } else {
    fontSize = heightSize
  }

  return [fontSize, fullName]
}

export function convertMeters2Degrees(x, y, finalScale, hallScale) {
  const lonlat = meters2degrees(finalScale * (hallScale * x / UNIT_SCALE_FACTOR), finalScale * (-1 * (hallScale * y / UNIT_SCALE_FACTOR)))
  return lonlat
}

export function convertMeters2DegreesNN(x, y, finalScale, hallScale) {
  const lonlat = meters2degrees(finalScale * (hallScale * x / UNIT_SCALE_FACTOR), finalScale * (hallScale * y / UNIT_SCALE_FACTOR))
  return lonlat
}
