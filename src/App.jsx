// App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Box, Button } from '@mui/material';
import FinancialModel from '../components/FinanciaModel';
import Map from './components/Map/Map';
import { SearchBar } from './components/SearchBar';
import ProjectGrid from './components/ProjectGrid';
import axios from 'axios';

function FinancialTab() {
  return (
    <div>
      <FinancialModel />
    </div>
  );
}

function MainContent({ view, projects, handleSearch, handleFilterChange, filters, setMinInvestment, toggleView, loadMoreProjects, totalProjects }) {
  const location = useLocation();
  const isFinancialRoute = location.pathname === '/financial';

  return (
    <div>
      {!isFinancialRoute && (
        <div className="search-bar-container">
          <SearchBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            minInvestment={filters.minInvestment}
            setMinInvestment={setMinInvestment}
            filters={filters}
          />
          <Button onClick={toggleView} style={{ backgroundColor: "white" }}>
            {view === 'grid' ? 'Map' : 'Grid'}
          </Button>
        </div>
      )}
      <div className="main-content">
        <Routes>
          <Route path="/" element={
            <Box>
              {view === 'grid' ? (
                <ProjectGrid projects={projects} loadMoreProjects={loadMoreProjects} totalProjects={totalProjects} />
              ) : (
                <Map
                  projects={projects}
                  onSearch={handleSearch}
                  onFilterChange={handleFilterChange}
                  minInvestment={filters.minInvestment}
                  setMinInvestment={setMinInvestment}
                  filters={filters}
                />
              )}
            </Box>
          } />
          <Route path="/financial" element={<FinancialTab />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState('grid');
  const [filters, setFilters] = useState({
    searchTerm: '',
    investmentType: '',
    strategy: '',
    minInvestment: 0,
    tenure: ''
  });
  const [offset, setOffset] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(false); // New loading state
  const limit = 12;

  const fetchProjects = async (newFilters, newOffset) => {
    if (loading) return; // Prevent multiple calls

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/projects', {
        ...newFilters,
        offset: newOffset,
        limit
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { projects, totalProjects } = response.data;

      if (newOffset === 0) {
        setProjects(projects);
      } else {
        setProjects(prevProjects => [...prevProjects, ...projects]);
      }
      setTotalProjects(totalProjects);

      console.log(`Batch loaded: Offset ${newOffset}, Limit ${limit}`);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(filters, offset);
  }, [filters, offset]);

  const handleSearch = (term) => {
    setFilters(prevFilters => ({ ...prevFilters, searchTerm: term }));
    setOffset(0); // Reset offset when filters change
  };

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    setOffset(0); // Reset offset when filters change
  };

  const setMinInvestment = (value) => {
    setFilters(prevFilters => ({ ...prevFilters, minInvestment: value }));
    setOffset(0); // Reset offset when filters change
  };

  const toggleView = () => {
    setView(view === 'grid' ? 'map' : 'grid');
  };

  const loadMoreProjects = () => {
    if (projects.length < totalProjects && !loading) {
      setOffset(prevOffset => prevOffset + limit);
    } else {
      console.log('No more projects to load or currently loading');
    }
  };

  return (
    <Router>
      <MainContent
        view={view}
        projects={projects}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        filters={filters}
        setMinInvestment={setMinInvestment}
        toggleView={toggleView}
        loadMoreProjects={loadMoreProjects}
        totalProjects={totalProjects}
      />
    </Router>
  );
}

export default App;
