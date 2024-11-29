import React from 'react'
import { PropertyFiltersProps } from '../../../context/types';


const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  cities,
  propertyTypes,
  agents,
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  selectedAgent,
  setSelectedAgent,
  setSearch,
  search,
  showAgentFilter = true // Default to true if not provided
}) => {
  return (
    <>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="row mb-3">
        <div className="col">
          <select
            className="form-control"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="" disabled hidden>
              Select a city
            </option>
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <select
            className="form-control"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="" disabled hidden>
              Rent or Sale
            </option>
            <option value="">All Types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {showAgentFilter && ( // Conditionally render the agent filter
          <div className="col">
            <select
              className="form-control"
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
            >
              <option value="" disabled hidden>
                Select an agent
              </option>
              <option value="">All Agents</option>
              {agents?.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} {agent.surname}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyFilters;