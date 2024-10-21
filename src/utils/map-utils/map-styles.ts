import { Fill, Stroke, Style, Text } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { IAdsPointItem } from "../../interfaces";
import { Feature } from "ol";
import { FeatureLike } from "ol/Feature";

export const getUpperBaseLayerStyle = (): Style => {
    const strokeColor = '#11182780';
    const fillColor = '#3B82F625';
    const imageFillColor = '#3B82F6';
    const imageStrokeColor = '#F4F7FA';

    return new Style({
        stroke: new Stroke({
            color: strokeColor,
        }),
        fill: new Fill({
            color: fillColor,
        }),
        image: new CircleStyle({
            radius: 10,
            fill: new Fill({
                color: imageFillColor,
            }),
            stroke: new Stroke({
                color: imageStrokeColor,
                width: 1
            }),
        })
    });
};

export const getClusterLayerStyle = (feature: any): Style => {
    const size = feature.get("features").length;    
    
    let fillColor = '#3B82F6';
    let strokeColor = '#F4F7FA';
    let textFillColor = '#ffffff';
    let textValue = size.toString();

    // When cluster is 1 point only
    if (size == 1) {
        const point : Feature = feature.get("features")[0];
        const isPlanned : boolean = point.getProperties().isPlanned;

        fillColor = isPlanned ? 'green' : 'red';
        textValue = ["QC", "#F9FAFB bold 10px Arial"];
    }
    
    return new Style({
        image: new CircleStyle({
            radius: Math.min(size * 10, 15), // Adjust size based on the number of clustered points
            fill: new Fill({
                color: fillColor,
            }),
            stroke: new Stroke({
                color: strokeColor,
                width: 1,
            }),
        }),
        text: new Text({
            text: textValue,
            fill: new Fill({
                color: textFillColor,
            }),
        }),
    });
};

export const getAdsPointLayerStyle = (): Style => {
    const fillColor = 'green';
    const strokeColor = '#F4F7FA';

    return new Style({
        image: new CircleStyle({
            radius: 10,
            fill: new Fill({
                color: fillColor,
            }),
            stroke: new Stroke({
                color: strokeColor,
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