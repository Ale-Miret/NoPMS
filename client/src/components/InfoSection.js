import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const InfoSection = () => {
  return (
    <Box className="info-section" py={20} px={4}>
      <Heading className="info-header" as="h2" size="2xl" mb={5}>Welcome to our Project Management Tool</Heading>
      <Text className="info-text" fontSize="2xl" mb={5}> No plan? No problem!</Text>
      <Text className="info-text" fontSize="2xl" mb={5}>Our tool allows you to <span style={{fontStyle: "italic"}}>easily</span> manage your projects, collaborate with team members, <span style={{fontStyle: "italic"}}>and </span>stay informed about progress!</Text>
      <Button as={Link} to="/signup" className="info-button" variant="solid" size="lg">Get Started</Button>
    </Box>
  );
};

export default InfoSection;
