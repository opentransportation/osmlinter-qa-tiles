# OSMLinter using OSM QA Tiles

## How to Start

## Install

Using the current/latest version of NodeJS

```bash
$ git clone git@github.com:opentransportation/osmlinter-qa-tiles.git
$ cd osmlinter-qa-tiles
$ npm install
```

### Download latest [OSM QA Tiles](https://osmlab.github.io/osm-qa-tiles/)

```
$ wget https://s3.amazonaws.com/mapbox/osm-qa-tiles-production/latest.country/indonesia.mbtiles.gz
$ gzip -d indonesia.mbtiles.gz
```

## Start a process

The process will pipe out GeoJSON Features line by line which allows you to stream the data to a file.

There are a few default models that you can pick from, for instace `--model highways` will pipe out all features containing a highway tag from the OSM QA Tiles.

```bash
$ ./bin/osmlinter.js indonesia.mbtiles --tiles [[3258,2116,12]] --model highways > results.geojson
```

## CLI

```
  Usage:
    $ osmlinter <qa-tiles>
  Options:
    --output      [osmlinter] Filepath to store outputs
    --bbox        Excludes QATiles by BBox
    --tiles       Excludes QATiles by an Array of Tiles
    --debug       [false] Enables DEBUG mode
    --model       [default] Select pre-defined OSMLinter Model
    --map         [models/default/map.js] Map script filepath
    --reduce      [models/default/reduce.js] Reduce script filepath
    --end         [models/default/end.js] Reduce script filepath
    --mapOptions  Passes through arbitrary options to workers. Options are made available to map scripts as global.mapOptions
    --maxWorkers  By default, TileReduce creates one worker process per CPU. maxWorkers may be used to limit the number of workers created.
  Examples:
    $ osmlinter indonesia.mbtiles --model highways > results.geojson
    $ osmlinter indonesia.mbtiles --tiles [[3258,2116,12],[3259,2117,12]] > results.geojson
    $ osmlinter indonesia.mbtiles --bbox [106.3,-6.0,106.4,-5.9] > results.geojson
```

## Models (To-Do)

- Bridge Road classification different from before & start highway (http://www.openstreetmap.org/way/377069055)
- 2000+ Node Highways
- Poor Geometry Highway
- Untagged highways
