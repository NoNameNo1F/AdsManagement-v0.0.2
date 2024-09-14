import { Feature } from 'ol';
import { LineString, MultiLineString, MultiPoint, MultiPolygon, Polygon } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleGeom } from 'ol/geom';


// Create a LineString feature
const lineString = new LineString([
  fromLonLat([0, 0]),
  fromLonLat([10, 10])
]);

const lineFeature = new Feature({
  geometry: lineString
});

// Create a Polygon feature
const polygon = new Polygon([[
  fromLonLat([-10, -10]),
  fromLonLat([10, -10]),
  fromLonLat([10, 10]),
  fromLonLat([-10, 10]),
  fromLonLat([-10, -10])
]]);

const polygonFeature = new Feature({
  geometry: polygon
});

// Create a Circle feature
const circle = new CircleGeom(fromLonLat([0, 0]), 1000000); // Radius in meters

const circleFeature = new Feature({
  geometry: circle
});

// Create a MultiPoint feature
const multiPoint = new MultiPoint([
  fromLonLat([23, 111]),
  fromLonLat([10, 10]),
  fromLonLat([-10, -10])
]);

const multiPointFeature = new Feature({
  geometry: multiPoint
});

// Create a MultiLineString feature
const multiLineString = new MultiLineString([
  [
    fromLonLat([0, 0]),
    fromLonLat([111, 111])
  ],
  [
    fromLonLat([-10, -10]),
    fromLonLat([-20, -20])
  ]
]);

const multiLineStringFeature = new Feature({
  geometry: multiLineString
});

// Create a MultiPolygon feature
const multiPolygon = new MultiPolygon([
  [[
    fromLonLat([-10, -10]),
    fromLonLat([10, -10]),
    fromLonLat([10, 10]),
    fromLonLat([-10, 10]),
    fromLonLat([-10, -10])
  ]],
  [[
    fromLonLat([20, 20]),
    fromLonLat([30, 20]),
    fromLonLat([30, 30]),
    fromLonLat([20, 30]),
    fromLonLat([20, 20])
  ]]
]);

const multiPolygonFeature = new Feature({
  geometry: multiPolygon
});

export {lineFeature, polygonFeature, circleFeature, multiPointFeature, multiLineStringFeature, multiPolygonFeature};