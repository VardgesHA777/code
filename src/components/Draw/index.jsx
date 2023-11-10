import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw/dist/leaflet.draw';

const Draw = () => {
    const map = useMap();

    useEffect(() => {
        var scriptElement = document.createElement('script');

        // Set the src attribute to include an external script
        scriptElement.src =
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.js';
        document.getElementById('root').appendChild(scriptElement);

        setTimeout(() => {
            var drawnItems = new L.geoJson().addTo(map);

            new L.Control.Draw({
                position: 'topleft',
                edit: {
                    featureGroup: drawnItems,
                },
                draw: {
                    circleline: false,
                    circle: false,
                    polygon: {
                        shapeOptions: {
                            clickable: true,
                            weight: 10,
                        },
                    },
                    rectangle: {
                        shapeOptions: {
                            clickable: true,
                            color: 'green',
                        },
                    },
                    circlemarker: false,
                },
                remove: false, // Add the remove option for clearing all drawn items
            }).addTo(map);

            map.on(L.Draw.Event.CREATED, function (e) {
                var layer = e.layer;
                drawnItems.addLayer(layer);

                // Add a click event listener to the drawn layer
                layer.on('click', function (e) {
                    var deleteBtnId = 'deleteBtn_' + layer._leaflet_id;
                    // Open the popup on click
                    if (!layer.isPopupOpen()) {

                        // Open the popup only if it's not already open
                        layer.bindPopup(
                            "<button id='" + deleteBtnId + "'>Delete</button>"
                        ).openPopup();

                        // Add a click event listener to the delete button inside the popu
                    }
                    document.getElementById(deleteBtnId).addEventListener('click', function () {
                        console.log('layer', layer);
                        drawnItems.removeLayer(layer);
                    });
                });
            });
        }, 2000);
    }, [map]);

    return <div />;
};

export default Draw;
