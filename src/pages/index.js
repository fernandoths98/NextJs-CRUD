import {
  Box,
  Button,
  Flex,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

import Api from "../service/api";

import { Header } from "../components/Header";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [validation, setValidation] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const isValidFormData = () => {
    if (!firstName) {
      return toast({
        title: "First Name is required",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
    if (!lastName) {
      return toast({
        title: "Last Name is required",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
    if (!email) {
      return toast({
        title: "Email is required",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
    if (!phone) {
      return toast({
        title: "Phone is required",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
    if (!address) {
      return toast({
        title: "Address is required",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }

    if (
      validation.some(
        (validation) => validation.email === email && validation._id !== id
      )
    ) {
      return toast({
        title: "Email already exists",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const handleSubmitCreateClient = async (e) => {
    e.preventDefault();

    if (isValidFormData()) return;
    try {
      setIsLoading(true);
      const { data } = await Api.post("/clients", {
        firstName,
        lastName,
        email,
        phone,
        address,
      });
      setValidation(validation.concat(data.data));
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");

      setIsFormOpen(!isFormOpen);
      toast({
        title: "Input Data Sukses",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async (_id) => {
    try {
      await Api.delete(`/clients/${_id}`);
      toast({
        title: "Delete Data Sukses",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handlShowUpdateClient = (item) => {
    setId(item._id);
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setEmail(item.email);
    setPhone(item.phone);
    setAddress(item.address);
    setIsFormOpen(true);
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();

    if (isValidFormData()) return;

    try {
      setIsLoading(true);
      await Api.put(`clients/${id}`, {
        firstName,
        lastName,
        email,
        phone,
        address,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setId(null);
      setIsFormOpen(!isFormOpen);

      toast({
        title: "Update Data Sukses!!",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    [
      Api.get("/clients").then(({ data }) => {
        setValidation(data.data);
      }),
    ];
  }, [validation]);

  return (
    <Box>
      <Header />
      <Flex align="center" justifycontent="center">
        <Box
          width={800}
          borderWidth={1}
          borderRadius={10}
          boxShadow="lg"
          p={20}
          mt="25"
        >
          <Flex justifycontent="flex-end">
            <Button
              colorScheme="green"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              {" "}
              {isFormOpen ? "-" : "+"}{" "}
            </Button>
          </Flex>

          {isFormOpen ? (
            <VStack
              as="form"
              justifycontent="center"
              align="center"
              onSubmit={id ? handleUpdateClient : handleSubmitCreateClient}
            >
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="number"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>

              <Button colorScheme="green" type="submit" mt={6}>
                {id ? "Update" : "Create"}
              </Button>
            </VStack>
          ) : null}

          <Table variant="simple" mt={6}>
            <Thead bg="teal.300">
              <Tr>
                <Th textColor="white">Firstname</Th>
                <Th textColor="white">Lastname</Th>
                <Th textColor="white">Email</Th>
                <Th textColor="white">Phone</Th>
                <Th textColor="white">Address</Th>
              </Tr>
            </Thead>
            <Tbody>
              {validation.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.firstName}</Td>
                  <Td>{item.lastName}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.phone}</Td>
                  <Td>{item.address}</Td>
                  <Td justifycontent="space-between">
                    <Flex>
                      <Button
                        size="sm"
                        fontSize="small"
                        colorScheme="yellow"
                        mr="2"
                        onClick={() => handlShowUpdateClient(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        fontSize="small"
                        colorScheme="red"
                        mr="2"
                        onClick={() => handleDeleteClient(item._id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}
