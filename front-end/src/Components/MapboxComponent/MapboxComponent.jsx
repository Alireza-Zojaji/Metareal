import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";

const MapboxComponent = ({ ...props }) => {
  const { mapContainer } = useMapboxContext();
  return (
    <>
      <div {...props} ref={mapContainer}></div>
    </>
  );
};
export default MapboxComponent;
