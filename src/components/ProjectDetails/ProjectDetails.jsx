import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectPopup from '../Project_popup/ProjectPopup';

const ProjectDetails = ({ projects, selectedProject, onSelectProject, imageData }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProject) {
      const intervalId = setInterval(() => {
        setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }, 5000); 

      return () => clearInterval(intervalId);
    }
  }, [projects.length, selectedProject]);

  const handleButtonClick = (project) => {
    onSelectProject(selectedProject ? null : project);
  };

  const handleNavigateToFinancial = () => {
    if (displayedProject) {
      navigate('/financial', {
        state: {
          projectName: displayedProject['Project Name'], 
          projectCost: displayedProject['Cost']  
        }
      });
    }
  };

  const displayedProject = selectedProject || projects[currentProjectIndex];

  return (
    <div className="project-details">
      {displayedProject && (
        <div className="project-popup-container">
          <ProjectPopup 
            project={displayedProject} 
            images={imageData.find(item => item.project_id === displayedProject['Internal ID'])?.large_image_urls || []} 
          />
          
          <button onClick={() => handleButtonClick(displayedProject)}>
            {selectedProject ? 'Return' : 'Select'}
          </button>
        </div>
      )}
      <button onClick={handleNavigateToFinancial}>Go to Financial Model</button>
    </div>
  );
};

export default ProjectDetails;
