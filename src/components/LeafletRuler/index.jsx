import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./leaflet-ruler.css";
import "./leaflet-ruler";

export default function LeafletRuler() {
    const map = useMap();

    useEffect(() => {
        if (!map) return;
        const options = {
            position: 'topright',            // Position to show the control. Values: 'topright', 'topleft', 'bottomright', 'bottomleft'
        }

        setTimeout(() => {
            L.control.polylineMeasure(options).addTo(map);
        },1000)
    }, [map]);

    return null;
}
