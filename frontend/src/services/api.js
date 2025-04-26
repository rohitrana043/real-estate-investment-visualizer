import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Properties API calls
export const fetchProperties = async (filters = {}) => {
  try {
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
    throw error;
  }
};

export const fetchPropertyById = async (id) => {
  try {
    const response = await apiClient.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching property with id ${id}:`, error);
    throw error;
  }
};

export const fetchPropertiesInBounds = async (bounds) => {
  try {
    const { southLat, northLat, westLng, eastLng } = bounds;
    const response = await apiClient.get('/properties/bounds', {
      params: { southLat, northLat, westLng, eastLng },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching properties in bounds:', error);
    // If we're in development mode and the API failed, return mock Toronto data
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock Toronto data for development');
      // This would be replaced with actual mock data in a real implementation
      return mockTorontoProperties;
    }
    throw error;
  }
};

// Location Scores API calls
export const fetchLocationScores = async (filters = {}) => {
  try {
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
    throw error;
  }
};

export const fetchLocationScoreById = async (id) => {
  try {
    const response = await apiClient.get(`/location-scores/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching location score with id ${id}:`, error);
    throw error;
  }
};

export const fetchLocationScoresInBounds = async (bounds) => {
  try {
    const { southLat, northLat, westLng, eastLng } = bounds;
    const response = await apiClient.get('/location-scores/bounds', {
      params: { southLat, northLat, westLng, eastLng },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching location scores in bounds:', error);
    throw error;
  }
};

// Filter-based API calls
export const fetchPropertiesByMetric = async (metric, minValue) => {
  try {
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
    throw error;
  }
};

export const addProperty = async (propertyData) => {
  try {
    const response = await apiClient.post('/properties', propertyData);
    return response.data;
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};

export const updateProperty = async (id, propertyData) => {
  try {
    const response = await apiClient.put(`/properties/${id}`, propertyData);
    return response.data;
  } catch (error) {
    console.error(`Error updating property with id ${id}:`, error);
    throw error;
  }
};

export const deleteProperty = async (id) => {
  try {
    await apiClient.delete(`/properties/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting property with id ${id}:`, error);
    throw error;
  }
};

// Mock data for development - could be expanded in a real implementation
const mockTorontoProperties = [
  {
    id: 1,
    address: '35 Balmuto Street, Unit 1807',
    city: 'Toronto',
    state: 'ON',
    zipCode: 'M4Y 0A3',
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 550,
    yearBuilt: 2005,
    listPrice: 699000.0,
    status: 'Active',
    latitude: 43.6698,
    longitude: -79.3863,
    capRate: 2.85,
    appreciationRate: 4.2,
    cashOnCashReturn: 4.3,
    monthlyRent: 2500.0,
    yearlyExpenses: 9800.0,
    imageUrl: 'https://example.com/images/35-balmuto.jpg',
    description: 'Elegant 1-bedroom condo in the heart of downtown Toronto.',
  },
  {
    id: 2,
    address: '12 York Street, Unit 5601',
    city: 'Toronto',
    state: 'ON',
    zipCode: 'M5J 0A9',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 850,
    yearBuilt: 2016,
    listPrice: 1250000.0,
    status: 'Active',
    latitude: 43.6416,
    longitude: -79.3808,
    capRate: 2.45,
    appreciationRate: 5.1,
    cashOnCashReturn: 3.8,
    monthlyRent: 3800.0,
    yearlyExpenses: 16200.0,
    imageUrl: 'https://example.com/images/12-york.jpg',
    description: 'Luxurious 2-bedroom, 2-bathroom condo in Ice Condos.',
  },
];

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
