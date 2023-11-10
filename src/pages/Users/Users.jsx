import "leaflet/dist/leaflet.css";
import '../../components/LeafletRuler/leaflet-ruler.css'
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import { Button } from "@vardgesha777/ui-kitt";
import { MapContainer, TileLayer } from "react-leaflet";
import Draw from "../../components/Draw";

const Map = () => {

  return (
     <div className='map-container'>
       <MapContainer center={[54.989, 73.369]} zoom={12} scrollWheelZoom={false} id="map" style={{width: '1500px', height: '800px'}}>
         <TileLayer
             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
           <Draw/>
       </MapContainer>
     </div>
  );
};

export default Map;
