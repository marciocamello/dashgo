import { Button, Flex, Stack } from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "../components/Form/Input";
import { useAuth } from "../contexts/AuthContext";
import { withSSRGuest } from "../utils/withSSRGuest";

type SignInFormData = {
    email: string;
    password: string;
}

const signInFormSchema = yup.object().shape({
    email: yup.string().email('Email invalido').required('Email e obrigatorio'),
    password: yup.string().required('Password e obrigatorio'),
});

export default function SignIn() {
    const { signIn } = useAuth();
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema)
    })

    const { errors } = formState;

    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
        await signIn(values)
    }

    return (
        <Flex
            w="100vw"
            h="100vh"
            align="center"
            justify="center"
        >
            <Flex
                as="form"
                w="100%"
                maxWidth={420}
                bg="gray.800"
                p="8"
                borderRadius={8}
                flexDir="column"
                onSubmit={handleSubmit(handleSignIn)}
            >
                <Stack spacing={4}>
                    <Input
                        name="email"
                        label="Email"
                        type="email"
                        error={errors.email}
                        {...register('email')}
                    />
                    <Input
                        name="password"
                        label="Password"
                        type="password"
                        error={errors.password}
                        {...register('password')}
                    />
                </Stack>
                <Button
                    type="submit"
                    mt={6}
                    colorScheme="pink"
                    size="lg"
                    isLoading={formState.isSubmitting}
                >
                    Entrar
                </Button>
            </Flex>
        </Flex >
    )
}

export const getServerSideProps = withSSRGuest<{ users: string[] }>(async (context) => {

    return {
        props: {
            users: [""]
        }
    }
})
