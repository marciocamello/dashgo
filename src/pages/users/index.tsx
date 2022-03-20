import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import NavLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiDeleteBinLine, RiPencilLine, RiRefreshLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/users/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList() {
    const [page, setPage] = useState(1);
    const { data, isLoading, error, isFetching, refetch } = useUsers(page);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(["user", userId], async () => {
            const response = await api.get(`/users/${userId}`)

            return response.data
        }, {
            staleTime: 1000 * 600 * 10 // 10 minutes
        });
    }

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
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            {!isLoading && isFetching && <Spinner
                                size="sm"
                                color="gray.500"
                                ml="4"
                            />}
                        </Heading>
                        <Stack isInline >
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="purple"
                                leftIcon={<Icon as={RiRefreshLine} fontSize="20" />}
                                onClick={() => refetch()}
                                isLoading={isFetching}
                            >
                                Refresh
                            </Button>

                            <NavLink href="users/create" passHref>
                                <Button
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="pink"
                                    leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                                >
                                    Criar novo
                                </Button>
                            </NavLink>
                        </Stack>
                    </Flex>

                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados</Text>
                        </Flex>
                    ) : (
                        <>
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
                                    {data.users.map((user) => (
                                        <Tr key={user.name}>
                                            <Td px={["4", "4", "6"]}>
                                                <Checkbox colorScheme="pink" />
                                            </Td>
                                            <Td>
                                                <Box>
                                                    <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(String(user.id))}>
                                                        <Text fontWeight="bold">{user.name}</Text>
                                                    </Link>
                                                    <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                </Box>
                                            </Td>
                                            <Td>{isWideVersion && user.createdAt}</Td>
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
                                    ))}
                                </Tbody>
                            </Table>

                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex >
        </Box >
    )
}