import VectorSource from "ol/source/Vector";
import { ISelectedFeatureInfo } from "../../interfaces";
import { Feature, Map, MapBrowserEvent } from "ol";
import { Point } from "ol/geom";
import { toLonLat } from "ol/proj";
import { setMarkerLayer } from "./map-layers";
import { altKeyOnly, click } from "ol/events/condition";
import { Draw, Interaction, Select } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";
import { GeoJSON } from "ol/format";
import { v4 as uuid } from 'uuid';
import { saveAdsPoints } from "../../components/page/map/axios";

export const mapHoverInteraction = (
    map: Map,
    markerSource: VectorSource,
    setSelectedFeatureInfo: (info: ISelectedFeatureInfo) => void,
    showPopUp: (coords: [number, number]) => void,
    closePopUp: () => void
) => {
    map.on('pointermove', (event: MapBrowserEvent<any>) => {
        map.getTargetElement().style.cursor = 'default';
        const pixel = map.getEventPixel(event.originalEvent);
        const feature: any = map.forEachFeatureAtPixel(pixel, (feature) => feature);


        if (feature && feature.getGeometry() instanceof Point) {
            map.getTargetElement().style.cursor = 'pointer'; // Change cursor to pointer
            const coords = feature.getGeometry().getCoordinates();
            const lonLat = toLonLat(coords);

            // Handle hover actions similar to click
            markerSource.clear();
            markerSource.addFeature(new Feature(new Point(coords)));

            const markerLayer = setMarkerLayer(markerSource);

            map.addLayer(markerLayer);

            setSelectedFeatureInfo({
                name: feature.getProperties().text,
                coordinates: lonLat,
            });

            showPopUp(coords); // Show popup for hovered point
        } else {
            // Reset if not hovering over a point
            // setSelectedFeatureInfo({name: null, coordinates: null});
            // markerSource.clear();
            // closePopUp();
        }
    });
}


export const mapSelectInteraction = (
    interaction: Select,
    map: Map,
    markerSource: VectorSource,
    setSelectedFeatureInfo: (info: ISelectedFeatureInfo) => void,
    showPopUp: (coords: [number, number]) => void,
    closePopUp: () => void,
    setDisplayAdsPointList: (value: boolean) => void,
) => {
    map.addInteraction(interaction);
    
    interaction.on('select', (e) => {
        if (e.selected.length > 0) {
            const selectedFeature = e.selected[0];
            const geometry = selectedFeature.getGeometry();
            if (geometry) {
                if (geometry instanceof Point) {
                    const coords = geometry.getCoordinates();
                    const lonLat = toLonLat(coords);
                    markerSource.clear();
                    markerSource.addFeature(
                        new Feature(
                            new Point(coords)
                        )
                    );
                    const markerLayer = setMarkerLayer(markerSource);
                    map.addLayer(markerLayer);

                    setSelectedFeatureInfo({
                        name: selectedFeature.getProperties().text,
                        coordinates: lonLat
                    });

                    showPopUp(coords as [number, number]);
                    setDisplayAdsPointList(true);
                } else {
                    setSelectedFeatureInfo({name: null, coordinates: null});
                    markerSource.clear();
                    closePopUp();
                    setDisplayAdsPointList(false);
                }
            }
        } else {
            setSelectedFeatureInfo({name: null, coordinates: null});
            markerSource.clear();
            closePopUp();
            setDisplayAdsPointList(false);
        }
    });
};

export const mapDrawPointInteraction = (
    map: Map,
    adsPointsSource: VectorSource,
    drawInteraction: Draw
) => {
    map.addInteraction(drawInteraction);
    drawInteraction.on('drawend', async (event) => {
        // console.log("1. adsPointLayer: ", adsPointsLayer.getSource()?.getFeatures());
        // console.log("2. adsPointSource: ", adsPointsLayer.getSource());
        // console.log("3. adsPointSource: ", upperBaseLayer.getSource());
        let feature = event.feature;
        const format = new GeoJSON();
        feature.setProperties({
            text: "Ads point",
        });
        feature.setId(uuid());
        const newFeature = format.writeFeatureObject(feature);

        console.log("3. New feature created: ", newFeature);


        try {
            await saveAdsPoints(newFeature);
            adsPointsSource.addFeature(feature);
            console.log("4a. Features: ", adsPointsSource.getFeatures());
        } catch (error) {
            console.error("4b. Error saving ads points: ", error);
        }
    });
};
