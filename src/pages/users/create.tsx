import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/apiClient";
import { queryClient } from "../../services/queryClient";

type UserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const userFormSchema = yup.object().shape({
    name: yup.string().required('Nome e obrigatorio'),
    email: yup.string().email('Email invalido').required('Email e obrigatorio'),
    password: yup.string().required('Password e obrigatorio').min(6, 'Password deve ter no minimo 6 caracteres'),
    password_confirmation: yup.string()
        .required('Password deve ser confirmada')
        .oneOf([yup.ref('password'), null], 'Password deve ser confirmada'),
});

export default function CreateUser() {
    const router = useRouter();

    const createUser = useMutation(async (user: UserFormData) => {
        const response = await api.post('users', {
            user: {
                ...user,
                created_at: new Date(),
            }
        });

        return response.data.user;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        }
    });

    const { register, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(userFormSchema)
    })

    const { errors } = formState;

    const handleCreateUser: SubmitHandler<UserFormData> = async (values) => {
        await createUser.mutateAsync(values);
        reset();
        router.push('/users');
    }

    return (
        <Box>
            <Header />

            <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box
                    as="form"
                    flex="1"
                    p={["6", "8"]}
                    bg="gray.800"
                    borderRadius={8}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading size="lg" fontWeight="normal">
                        Criar Usuario
                    </Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                name="name"
                                label="Nome completo"
                                error={errors.name}
                                {...register('name')}
                            />
                            <Input
                                name="email"
                                label="E-mail"
                                type="email"
                                error={errors.email}
                                {...register('email')}
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                name="password"
                                label="Senha"
                                type="password"
                                error={errors.password}
                                {...register('password')}
                            />
                            <Input
                                name="password_confirmation"
                                label="Confirmar senha"
                                type="password"
                                error={errors.password_confirmation}
                                {...register('password_confirmation')}
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex
                        mt="8"
                        justify="flex-end"
                    >
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button
                                colorScheme="pink"
                                type="submit"
                                isLoading={formState.isSubmitting}
                            >
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}