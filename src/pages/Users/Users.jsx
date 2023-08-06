import { useEffect } from "react";
import LeafletRuler from "../../components/LeafletRuler";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Users = () => {
    const position = [51.505, -0.09];
    useEffect(() => {
        const script = document.createElement("script")
        script.src = 'https://ppete2.github.io/Leaflet.PolylineMeasure/Leaflet.PolylineMeasure.js'
        document.body.appendChild(script)
    },[])
  return (
    <div>
        <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LeafletRuler />
        </MapContainer>
    </div>
  );
};

export default Users;
