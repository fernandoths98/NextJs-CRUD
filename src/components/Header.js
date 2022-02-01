import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

export const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="teal.300"
      color="white"
      padding={7}
    >
      <Flex align="center" mr={5}>
        <Heading as="h2" size="lg" letterSpacing={"tighter"}>
          {" "}
          Next Js CRUD{" "}
        </Heading>
      </Flex>
    </Flex>
  );
};
