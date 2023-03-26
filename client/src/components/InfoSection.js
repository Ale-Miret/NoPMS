import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const InfoSection = () => {
  return (
    <Box className="info-section" py={20} px={4}>
      <Heading as="h2" size="xl" mb={5}>Welcome to Our Project Management Tool</Heading>
      <Text fontSize="xl" mb={5}>Our tool allows you to easily manage your projects, collaborate with team members, and stay informed about progress.</Text>
      <Button as={Link} to="/signup" colorScheme="blue">Get Started</Button>
    </Box>
  );
};

export default InfoSection;
