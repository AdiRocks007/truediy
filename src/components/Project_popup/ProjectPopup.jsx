import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton
} from "@material-tailwind/react";
import {Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function PropCard({ project }) {
  const {
    "Project Name": projectName,
    "Developer": developer,
    "Strategy": strategy,
    "Investment Type": investmentType,
    "Cost": cost,
    "Tenure": tenure,
    "IRR": irr,
    "Average Price": averagePrice,
  } = project;

  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/financial', { state: { projectName, projectCost: cost } });
  };

  return (
    <Card className="w-full max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img
          src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt={projectName}
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {projectName}
          </Typography>
          <Typography color="blue-gray" className="font-normal">
            {developer}
          </Typography>
        </div>
        <Typography color="gray" className="mb-2">
          Strategy: {strategy} | Inv. Type: {investmentType}
        </Typography>
        <Grid container>
          <Grid item xs={6} sm={3}><Typography variant="small" className="font-semibold">Min. Inv</Typography></Grid>
          <Grid item xs={6} sm={3}><Typography variant="small" className="font-semibold">Avg. Price</Typography></Grid>
          <Grid item xs={6} sm={3}><Typography variant="small" className="font-semibold">Tenure</Typography></Grid>
          <Grid item xs={6} sm={3}><Typography variant="small" className="font-semibold">IRR</Typography></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6} sm={3}><Typography>{cost}</Typography></Grid>
          <Grid item xs={6} sm={3}><Typography>{averagePrice}</Typography></Grid>
          <Grid item xs={6} sm={3}><Typography>{tenure}</Typography></Grid>
          <Grid item xs={6} sm={3}><Typography>{irr}</Typography></Grid>
        </Grid>
      </CardBody>
      <CardFooter className="pt-3">
        <Button size="lg" fullWidth={true} onClick={handleViewMore}>
          View More
        </Button>
      </CardFooter>
    </Card>
  );
}
