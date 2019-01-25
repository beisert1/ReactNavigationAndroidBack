// Helper functions

// Variables for coordinate calculations
const RADIUS = 6378137.3142

// Deal with Transformations
// Convert degrees to meters
export function degrees2meters(lon, lat) {
  const x = (toRadians(lon) * RADIUS) / 10
  const y = (Math.log(Math.tan(lat * (Math.PI / 180) / 2 + Math.PI / 4)) * RADIUS) / 10
  return [x, y]
}

// Convert meters to degrees
export function meters2degrees(x, y) {
  const lon = 10 * (toDegrees(x / RADIUS))
  const lat = 10 * ((2 * Math.atan(Math.exp(y / RADIUS)) - Math.PI / 2) / (Math.PI / 180))
  return [lon, lat]
}

// Helper for the helpers
// Converts radians to degrees
function toDegrees(radians) {
  return radians * 180 / Math.PI
}

// Converts degrees to radians
function toRadians(degrees) {
  return degrees * Math.PI / 180
}

export function bbox(geojson) {
  const boundBox = [Infinity, Infinity, -Infinity, -Infinity]
  coordEach(
    geojson,
    (coord) => {
      if (boundBox[0] > coord[0]) boundBox[0] = coord[0]
      if (boundBox[1] > coord[1]) boundBox[1] = coord[1]
      if (boundBox[2] < coord[0]) boundBox[2] = coord[0]
      if (boundBox[3] < coord[1]) boundBox[3] = coord[1]
    },
  )
  return boundBox
}

function coordEach(layer, callback, excludeWrapCoord) {
  let i, j, k, g, l, geometry, stopG, coords,
    geometryMaybeCollection,
    wrapShrink = 0,
    isGeometryCollection

  const stop = isFeatureCollection ? layer.features.length : 1
  const isFeature = layer.type === "Feature"
  const isFeatureCollection = layer.type === "FeatureCollection"

  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = (isFeatureCollection ? layer.features[i].geometry : (isFeature ? layer.geometry : layer))
    isGeometryCollection = geometryMaybeCollection.type === "GeometryCollection"
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1
    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection ?
        geometryMaybeCollection.geometries[g] : geometryMaybeCollection
      coords = geometry.coordinates

      wrapShrink = (excludeWrapCoord &&
          (geometry.type === "Polygon" || geometry.type === "MultiPolygon")) ? 1 : 0

      if (geometry.type === "Point") {
        callback(coords)
      } else if (geometry.type === "LineString" || geometry.type === "MultiPoint") {
        for (j = 0; j < coords.length; j++) callback(coords[j])
      } else if (geometry.type === "Polygon" || geometry.type === "MultiLineString") {
        for (j = 0; j < coords.length; j++) {
          for (k = 0; k < coords[j].length - wrapShrink; k++) {
            callback(coords[j][k])
          }
        }
      } else if (geometry.type === "MultiPolygon") {
        for (j = 0; j < coords.length; j++) {
          for (k = 0; k < coords[j].length; k++) {
            for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
              callback(coords[j][k][l])
            }
          }
        }
      } else {
        throw new Error("Unknown Geometry Type")
      }
    }
  }
}
