import React from 'react';
import { Box, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box className="footer-container" bg="gray.200" py={4}>
      <Text textAlign="center" fontSize="sm">
        &copy; 2023 My Awesome Website. All rights reserved.
      </Text>
      <Text textAlign="center" fontSize="sm">
        Created by &nbsp;
        <Link href="https://github.com/Ale-Miret">Alejandra Miret,</Link>&nbsp;
        <Link href="https://github.com/christopherdoolhoff">Christopher Doolhoff,</Link>&nbsp;
        <Link href="https://github.com/gkaramanis1">George Karamanis,</Link>&nbsp;
        <Link href="https://github.com/jon-dev092">Jonathan Perez, and</Link>&nbsp;
        <Link href="https://github.com/NickMiller02">Nicholas Miller</Link>
      </Text>
    </Box>
  );
};

export default Footer;
