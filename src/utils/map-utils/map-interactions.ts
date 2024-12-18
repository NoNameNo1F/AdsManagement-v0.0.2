import VectorSource from "ol/source/Vector";
import { ISelectedFeatureInfo } from "../../interfaces";
import { Feature, Map, MapBrowserEvent } from "ol";
import { Geometry, Point } from "ol/geom";
import { toLonLat } from "ol/proj";
import { setMarkerLayer } from "./map-layers";
import { Draw, Select } from "ol/interaction";
import { GeoJSON } from "ol/format";
import { v4 as uuid } from 'uuid';
import ISelectedPointInfo from "../../interfaces/selectedPointInfo";
import VectorLayer from "ol/layer/Vector";
import { FeatureLike } from "ol/Feature";
import { boundingExtent } from "ol/extent";

export const addMapHoverInteraction = (
    map: Map,
    markerSource: VectorSource,
    setSelectedFeatureInfo: (info: ISelectedPointInfo) => void,
    showPopUp: (coords: [number, number]) => void,
    closePopUp: () => void
) => {
    map.on('pointermove', (event: MapBrowserEvent<any>) => {
        map.getTargetElement().style.cursor = 'default';
        const pixel = map.getEventPixel(event.originalEvent);
        const cluster_features: any = map.forEachFeatureAtPixel(pixel, (feature) => feature);

        if (cluster_features && cluster_features.getGeometry() instanceof Point) {
            map.getTargetElement().style.cursor = 'pointer'; 
            const coords = cluster_features.getGeometry().getCoordinates();
            const lonLat = toLonLat(coords);

            // Handle hover actions similar to click
            markerSource.addFeature(new Feature(new Point(coords)));
            const markerLayer = setMarkerLayer(markerSource);
            map.addLayer(markerLayer);

            // Get display a representative feature of a cluster
            const representativeFeature = cluster_features.get('features')[0];
            console.log(representativeFeature.getProperties());

            setSelectedFeatureInfo({
                name: representativeFeature.getProperties().address,
                locationType: representativeFeature.getProperties().locationType,
                advertisingForm: representativeFeature.getProperties().advertisingForm,
                isPlanned: representativeFeature.getProperties().isPlanned,
                coordinates: lonLat,
            });

            showPopUp(coords); 
        } else {
            // Reset if not hovering over a point
            setSelectedFeatureInfo({name: null, coordinates: null, locationType: null, advertisingForm: null, isPlanned: null});
            markerSource.clear();
            closePopUp();
        }
    });
};

export const addMapClusterClickInteraction = (map: Map, clusterLayer: VectorLayer<Feature<Geometry>>) => {
    const zoomInTime = 1000

    map.on('click', (e) => {
        clusterLayer.getFeatures(e.pixel).then((clickedFeatures : FeatureLike[]) => {
          if (clickedFeatures.length) {
            const features = clickedFeatures[0].get('features');

            if (features.length > 1) {
              const extent = boundingExtent(
                features.map((r: any) => r.getGeometry().getCoordinates()),
              );
              map.getView().fit(extent, {duration: zoomInTime, padding: [50, 50, 50, 50]});
            }
          }
        });
    });
};