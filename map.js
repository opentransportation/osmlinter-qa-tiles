const { featureEach } = require('@turf/meta')
const { featureCollection } = require('@turf/helpers')
const vectorTileToGeoJSON = require('./src/vector-tile-to-geojson')

// QA Tile reducer script
module.exports = (sources, tile, writeData, done) => {
  // Convert & Filter Vector Tile to GeoJSON
  const vectorTile = sources.qatiles.osm
  const geojson = vectorTileToGeoJSON(tile, vectorTile)

  // Save Results as GeoJSON FeatureCollection
  const results = featureCollection([])

  // Iterate over each GeoJSON Feature
  featureEach(geojson, feature => {
    // Perform analysis
    results.features.push(feature)
  })

  // Push GeoJSON FeatureCollection results to reduce.js
  done(null, results)
}