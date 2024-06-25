// ProjectGrid.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import { PropCard } from './Project_popup/ProjectPopup'; // Assuming you have a ProjectCard component

const ProjectGrid = ({ projects, loadMoreProjects, totalProjects }) => {
  const observer = useRef();

  const lastProjectElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMoreProjects();
      }
    });
    if (node) observer.current.observe(node);
  }, [loadMoreProjects]);

  return (
    <Grid container spacing={3}>
      {projects.map((project, index) => {
        if (projects.length === index + 1) {
          return (
            <Grid item key={project['Internal ID']} xs={12} sm={6} md={4} ref={lastProjectElementRef}>
              <PropCard project={project} />
            </Grid>
          );
        } else {
          return (
            <Grid item key={project['Internal ID']} xs={12} sm={6} md={4}>
              <PropCard project={project} />
            </Grid>
          );
        }
      })}
      {projects.length >= totalProjects && (
        <Grid item xs={12}>
          <p>No more projects to load</p>
        </Grid>
      )}
    </Grid>
  );
};

export default ProjectGrid;
