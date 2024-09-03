import { Fill, Stroke, Style, Text } from "ol/style";
import CircleStyle from "ol/style/Circle";

export const getUpperBaseLayerStyle = (): Style => {
    return new Style({
        stroke: new Stroke({
            color: '#11182780',
        }),
        fill: new Fill({
            color: '#3B82F625',
        }),
        image: new CircleStyle({
            radius: 10,
            fill: new Fill({
                color: '#3B82F6',
            }),
            stroke: new Stroke({
                color: '#F4F7FA',
                width: 1
            }),
        })
    });
};

export const getClusterLayerStyle = (feature: any): Style => {
    const size = feature.get("features").length;
    return new Style({
        image: new CircleStyle({
            radius: Math.min(size * 10, 20), // Adjust size based on the number of clustered points
            fill: new Fill({
                color: '#3B82F6',
            }),
            stroke: new Stroke({
                color: '#F4F7FA',
                width: 1,
            }),
        }),
        text: new Text({
            text: size.toString(),
            scale: 1.1,
            fill: new Fill({
                color: '#ffffff',
            }),
        }),
    });
};

export const getAdsPointLayerStyle = (): Style => {
    return new Style({
        image: new CircleStyle({
            radius: 10,
            fill: new Fill({
                color: '#3B82F6',
            }),
            stroke: new Stroke({
                color: '#F4F7FA',
                width: 1
            }),
        }),
        text: new Text({
            text: ["QC", "#F9FAFB bold 10px Arial"],
            justify: 'center',
            declutterMode: 'obstacle',
        })
    });
};