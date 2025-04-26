import axios from 'axios';
import mockProperties from '../mock/mock_properties.json';
import mockLocationScores from '../mock/mock_location_scores.json';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Check if we're in mock mode
const isMockMode = () => {
  return process.env.REACT_APP_MOCK === 'true';
};

// Properties API calls
export const fetchProperties = async (filters = {}) => {
  try {
    // If in mock mode, return mock data
    if (isMockMode()) {
      console.log('Using mock property data');
      return mockProperties;
    }

    const params = new URLSearchParams();

    // Add filters to query params if they exist
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value);
      }
    });

    const response = await apiClient.get('/properties', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    // Fall back to mock data if request fails
    console.log('Falling back to mock property data');
    return mockProperties;
  }
};

export const fetchPropertyById = async (id) => {
  try {
    // If in mock mode, find the property in mock data
    if (isMockMode()) {
      console.log('Using mock property data for single property');
      const property = mockProperties.find((p) => p.id === id);
      if (property) return property;
      throw new Error('Property not found in mock data');
    }

    const response = await apiClient.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching property with id ${id}:`, error);
    // Try to find the property in mock data as fallback
    const property = mockProperties.find((p) => p.id === id);
    if (property) return property;
    throw error;
  }
};

export const fetchPropertiesInBounds = async (bounds) => {
  try {
    // If in mock mode, return all mock data
    if (isMockMode()) {
      console.log('Using mock property data for bounds');
      return mockProperties;
    }

    const { southLat, northLat, westLng, eastLng } = bounds;
    const response = await apiClient.get('/properties/bounds', {
      params: { southLat, northLat, westLng, eastLng },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching properties in bounds:', error);
    // Fall back to mock data
    console.log('Falling back to mock property data for bounds');
    return mockProperties;
  }
};

// Location Scores API calls
export const fetchLocationScores = async (filters = {}) => {
  try {
    // If in mock mode, return mock data
    if (isMockMode()) {
      console.log('Using mock location score data');
      return mockLocationScores;
    }

    const params = new URLSearchParams();

    // Add filters to query params if they exist
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value);
      }
    });

    const response = await apiClient.get('/location-scores', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching location scores:', error);
    // Fall back to mock data
    console.log('Falling back to mock location score data');
    return mockLocationScores;
  }
};

export const fetchLocationScoreById = async (id) => {
  try {
    // If in mock mode, find the location score in mock data
    if (isMockMode()) {
      console.log('Using mock location score data for single score');
      const score = mockLocationScores.find((s) => s.id === id);
      if (score) return score;
      throw new Error('Location score not found in mock data');
    }

    const response = await apiClient.get(`/location-scores/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching location score with id ${id}:`, error);
    // Try to find the score in mock data as fallback
    const score = mockLocationScores.find((s) => s.id === id);
    if (score) return score;
    throw error;
  }
};

export const fetchLocationScoresInBounds = async (bounds) => {
  try {
    // If in mock mode, return all mock data
    if (isMockMode()) {
      console.log('Using mock location score data for bounds');
      return mockLocationScores;
    }

    const { southLat, northLat, westLng, eastLng } = bounds;
    const response = await apiClient.get('/location-scores/bounds', {
      params: { southLat, northLat, westLng, eastLng },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching location scores in bounds:', error);
    // Fall back to mock data
    console.log('Falling back to mock location score data for bounds');
    return mockLocationScores;
  }
};

// Filter-based API calls
export const fetchPropertiesByMetric = async (metric, minValue) => {
  try {
    // If in mock mode, filter mock data
    if (isMockMode()) {
      console.log(`Using mock data for properties by ${metric}`);
      return mockProperties.filter((prop) => prop[metric] >= minValue);
    }

    let endpoint = '/properties/filter';
    let paramName = '';

    // Map metric to appropriate parameter name
    switch (metric) {
      case 'capRate':
        paramName = 'minCapRate';
        break;
      case 'appreciation':
        paramName = 'minAppreciation';
        break;
      default:
        paramName = `min${metric.charAt(0).toUpperCase() + metric.slice(1)}`;
    }

    const params = {};
    params[paramName] = minValue;

    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching properties by ${metric}:`, error);
    // Filter mock data as fallback
    console.log(`Falling back to mock data for properties by ${metric}`);
    return mockProperties.filter((prop) => prop[metric] >= minValue);
  }
};

export const addProperty = async (propertyData) => {
  try {
    // If in mock mode, just return the property data with an ID
    if (isMockMode()) {
      console.log('Mocking add property');
      return {
        ...propertyData,
        id: mockProperties.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    const response = await apiClient.post('/properties', propertyData);
    return response.data;
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};

export const updateProperty = async (id, propertyData) => {
  try {
    // If in mock mode, return updated property data
    if (isMockMode()) {
      console.log('Mocking update property');
      return {
        ...propertyData,
        id,
        updatedAt: new Date().toISOString(),
      };
    }

    const response = await apiClient.put(`/properties/${id}`, propertyData);
    return response.data;
  } catch (error) {
    console.error(`Error updating property with id ${id}:`, error);
    throw error;
  }
};

export const deleteProperty = async (id) => {
  try {
    // If in mock mode, return success
    if (isMockMode()) {
      console.log('Mocking delete property');
      return true;
    }

    await apiClient.delete(`/properties/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting property with id ${id}:`, error);
    throw error;
  }
};

export default {
  fetchProperties,
  fetchPropertyById,
  fetchPropertiesInBounds,
  fetchLocationScores,
  fetchLocationScoreById,
  fetchLocationScoresInBounds,
  fetchPropertiesByMetric,
  addProperty,
  updateProperty,
  deleteProperty,
};
