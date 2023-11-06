import React, {useEffect} from 'react'
import { useMap } from "react-leaflet";
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'; // Add Leaflet CSS
import 'leaflet-draw/dist/leaflet.draw.css'; // Add Leaflet.draw CSS
import 'leaflet-draw/dist/leaflet.draw'; // Add Leaflet.draw JavaScript


const Draw = () => {
    const map = useMap()
    useEffect(() => {
        var scriptElement = document.createElement("script");

        // Set the src attribute to include an external script
        scriptElement.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.js";
        document.getElementById("root").appendChild(scriptElement);

        setTimeout(() => {
            var drawnItems = new L.geoJson().addTo(map);

            map.on(L.Draw.Event.CREATED, function (event) {
                var layer = event.layer;
                drawnItems.addLayer(layer);
            });

            L.EditToolbar.Delete.include({
                removeAllLayers: true
            });

            new L.Control.Draw({
                edit: {
                    featureGroup: drawnItems
                },
                draw: {
                    polygon: true,
                    rectangle: true,
                    circlemarker: false
                },
                remove: true // Add the remove option for clearing all drawn items
            }).addTo(map);

            map.on(L.Draw.Event.CREATED, function (e) {
                var layer = e.layer;
                drawnItems.addLayer(layer);
                console.log('barev',layer.getLatLngs())
            });
        },2000)
    },[])

    return (
        <div/>
    )
};

export default Draw
