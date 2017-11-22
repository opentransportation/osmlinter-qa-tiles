const path = require('path')
const tileReduce = require('@mapbox/tile-reduce')
const { featureEach } = require('@turf/meta')
const { tileToGeoJSON } = require('./src/utils')

/**
 * OSMLinter using OSM QA Tiles
 *
 * @param {string} mbtiles filepath to QA Tiles
 * @param {*} [options] extra options
 * @param {BBox} [options.bbox] Filter by BBox
 * @param {Tile[]} [options.tiles] Filter by Tiles
 * @param {string} [options.output="osmlinter"] directory to store outputs results
 * @param {boolean} [options.debug=false] Enables DEBUG mode
 * @returns {EventEmitter} tile-reduce EventEmitter
 */
module.exports = function (mbtiles, options) {
  options = options || {}

  // Tile Reduce options
  Object.assign(options, {
    zoom: 12,
    map: path.join(__dirname, 'map.js'),
    sources: [{name: 'qatiles', mbtiles, raw: true}]
  })
  const ee = tileReduce(options)

  // Execute the following after each tile is completed
  let total = 0
  ee.on('reduce', (results, tile) => {
    // pipe out streamed z12 tile
    process.stdout.write(JSON.stringify(tileToGeoJSON(tile)) + ',\n')

    // Iterate over each GeoJSON Feature in results
    featureEach(results, feature => {
      // pipe out streamed data to GeoJSON JSON Line
      process.stdout.write(JSON.stringify(feature) + ',\n')
      total++
    })
  })
  // Execute when tile reduce is completed
  ee.on('end', () => {
    // Any end processing can be added here
    process.stderr.write(`${total} GeoJSON Features saved\n`)
  })
  return ee
}