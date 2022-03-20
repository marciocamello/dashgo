import { Box, Button, Checkbox, Flex, Heading, Icon, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    return (
        <Box>
            <Header />

            <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" p="8" bg="gray.800" borderRadius={8}>
                    <Flex
                        mb="8"
                        justify="space-between"
                        align="center"
                    >
                        <Heading size="lg" fontWeight="normal">Usuários</Heading>

                        <Link href="users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                Criar novo
                            </Button>
                        </Link>
                    </Flex>

                    <Table
                        colorScheme="whiteAlpha"
                    >
                        <Thead>
                            <Tr>
                                <Th px={["4", "4", "6"]} color="gray.300" w="8">
                                    <Checkbox colorScheme="pink" />
                                </Th>
                                <Th>Usuario</Th>
                                <Th>{isWideVersion && "Data de cadastro"}</Th>
                                <Th w="8"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px={["4", "4", "6"]}>
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Marcio Camello</Text>
                                        <Text fontSize="sm" color="gray.300">mac3designer@gmail.com</Text>
                                    </Box>
                                </Td>
                                <Td>{isWideVersion && "01/01/2020"}</Td>
                                <Td>
                                    <Stack direction="row">
                                        <Button
                                            as="a"
                                            size="sm"
                                            fontSize="sm"
                                            colorScheme="purple"
                                            iconSpacing={isWideVersion ? '1.5' : '-0.5'}
                                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                        >
                                            {isWideVersion && "Editar"}
                                        </Button>
                                        <Button
                                            as="a"
                                            size="sm"
                                            fontSize="sm"
                                            colorScheme="red"
                                            iconSpacing={isWideVersion ? '1.5' : '-0.5'}
                                            leftIcon={<Icon as={RiDeleteBinLine} fontSize="16" />}
                                        >
                                            {isWideVersion && "Excluir"}
                                        </Button>
                                    </Stack>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td px={["4", "4", "6"]}>
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Marcio Camello</Text>
                                        <Text fontSize="sm" color="gray.300">mac3designer@gmail.com</Text>
                                    </Box>
                                </Td>
                                <Td>{isWideVersion && "01/01/2020"}</Td>
                                <Td>
                                    <Stack direction="row">
                                        <Button
                                            as="a"
                                            size="sm"
                                            fontSize="sm"
                                            colorScheme="purple"
                                            iconSpacing={isWideVersion ? '1.5' : '-0.5'}
                                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                        >
                                            {isWideVersion && "Editar"}
                                        </Button>
                                        <Button
                                            as="a"
                                            size="sm"
                                            fontSize="sm"
                                            colorScheme="red"
                                            iconSpacing={isWideVersion ? '1.5' : '-0.5'}
                                            leftIcon={<Icon as={RiDeleteBinLine} fontSize="16" />}
                                        >
                                            {isWideVersion && "Excluir"}
                                        </Button>
                                    </Stack>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td px={["4", "4", "6"]}>
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Marcio Camello</Text>
                                        <Text fontSize="sm" color="gray.300">mac3designer@gmail.com</Text>
                                    </Box>
                                </Td>
                                <Td>{isWideVersion && "01/01/2020"}</Td>
                                <Td>
                                    <Stack direction="row">
                                        <Link href="/users/edit" passHref>
                                            <Button
                                                as="a"
                                                size="sm"
                                                fontSize="sm"
                                                colorScheme="purple"
                                                iconSpacing={isWideVersion ? '1.5' : '-0.5'}
                                                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                            >
                                                {isWideVersion && "Editar"}
                                            </Button>
                                        </Link>
                                        <Button
                                            as="a"
                                            size="sm"
                                            fontSize="sm"
                                            colorScheme="red"
                                            iconSpacing={isWideVersion ? '1.5' : '-0.5'}
                                            leftIcon={<Icon as={RiDeleteBinLine} fontSize="16" />}
                                        >
                                            {isWideVersion && "Excluir"}
                                        </Button>
                                    </Stack>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>

                    <Pagination />
                </Box>
            </Flex>
        </Box>
    )
}