import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import Select from 'react-select';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { PropCard } from '../Project_popup/ProjectPopup';
import { SearchBar } from '../SearchBar';

const defaultCenter = { lat: 12.9927655, lng: 77.8060448 };

const mapContainerStyle = {
  height: '80vh',
  width: '100%',
};

const options = [
  { value: 'metro', label: 'Metros' },
  { value: 'school', label: 'Schools' },
  { value: 'hospital', label: 'Hospitals' },
];

const customIcons = {
  metro: new L.Icon({
    iconUrl: '/metro.png',
    iconSize: [40, 40],
  }),
  school: new L.Icon({
    iconUrl: '/education.png',
    iconSize: [40, 40],
  }),
  hospital: new L.Icon({
    iconUrl: '/hospital.png',
    iconSize: [40, 40],
  }),
  project: new L.Icon({
    iconUrl: '/location-pin.png',
    iconSize: [40, 40],
  }),
};

const Map = ({ projects, onSearch, onFilterChange, minInvestment, setMinInvestment, filters }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [metroData, setMetroData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [hospitalData, setHospitalData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [projectCenter, setProjectCenter] = useState(defaultCenter);
  const [micromarketsData, setMicromarketsData] = useState(null);
  const [showMicromarkets, setShowMicromarkets] = useState(false);
  const [shouldZoom, setShouldZoom] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch('/metros.json')
      .then(response => response.json())
      .then(data => setMetroData(data))
      .catch(error => console.error('Error fetching metros data:', error));

    fetch('/schools.json')
      .then(response => response.json())
      .then(data => setSchoolData(data))
      .catch(error => console.error('Error fetching schools data:', error));

    fetch('/hospitals.json')
      .then(response => response.json())
      .then(data => setHospitalData(data))
      .catch(error => console.error('Error fetching hospitals data:', error));

    fetch('/bangalore_adm5.geojson')
      .then(response => response.json())
      .then(data => setMicromarketsData(data))
      .catch(error => console.error('Error fetching micromarkets data:', error));
  }, []);

  useEffect(() => {
    setProjectCenter(defaultCenter);
    setShouldZoom(false);
    updateMarkers(null, selectedOptions);
  }, [selectedOptions]);

  const handleAmenityChange = (selectedOptions) => {
    const options = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedOptions(options);
    updateMarkers(null, options);
  };

  const updateMarkers = (projectId, amenities) => {
    const newMarkers = [];

    amenities.forEach(option => {
      if (option === 'metro') {
        newMarkers.push(...metroData.map(metro => ({ ...metro, type: 'metro' })));
      } else if (option === 'school') {
        newMarkers.push(...schoolData.map(school => ({ ...school, type: 'school' })));
      } else if (option === 'hospital') {
        newMarkers.push(...hospitalData.map(hospital => ({ ...hospital, type: 'hospital' })));
      }
    });

    setMarkers(newMarkers);
  };

  const handleMicromarketsToggle = () => {
    setShowMicromarkets(!showMicromarkets);
  };

  const handleMarkerClick = (project) => {
    setSelectedProject(project);
    setProjectCenter({ lat: project.Latitude, lng: project.Longitude });
    setShouldZoom(true);
  };

  const ZoomToMarker = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (shouldZoom) {
        map.setView(center, 14);
        setShouldZoom(false);
      }
    }, [center, map, shouldZoom]);
    return null;
  };

  const micromarketsStyle = {
    color: 'blue',
    weight: 1,
    fillColor: 'blue',
    fillOpacity: 0.1,
  };

  return (
    <section className="map">
      <div className="select-container">
        <Select
          options={options}
          isMulti
          onChange={handleAmenityChange}
          placeholder="Select amenities"
          value={options.filter(option => selectedOptions.includes(option.value))}
        />
      </div>
      
      <MapContainer
        center={projectCenter}
        zoom={12}
        style={mapContainerStyle}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {projects.map((project, index) => (
          <Marker
            key={`project-${index}`}
            position={[project.Latitude, project.Longitude]}
            icon={customIcons.project}
            eventHandlers={{
              click: () => handleMarkerClick(project),
            }}
          >
            <Popup>
              <PropCard project={project} />
            </Popup>
          </Marker>
        ))}
        {markers.map((marker, index) => (
          <Marker
            key={`marker-${index}`}
            position={[marker.coordinates.latitude, marker.coordinates.longitude]}
            icon={customIcons[marker.type]}
          >
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
        {showMicromarkets && micromarketsData && (
          <GeoJSON data={micromarketsData} style={micromarketsStyle} />
        )}
        {selectedProject && <ZoomToMarker center={projectCenter} />}
      </MapContainer>
    </section>
  );
};

export default Map;
