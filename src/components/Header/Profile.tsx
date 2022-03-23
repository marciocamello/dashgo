import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";

interface ProfileProps {
    showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
    const { user, signOut } = useAuth();

    function handleSignOut() {
        signOut();
    }

    return (
        <Flex
            align="center"
        >
            {showProfileData && <Box
                mr="4"
                textAlign="right"
            >
                <Text>{user?.name}</Text>
                <Text color="gray.300" fontSize="small">
                    {user?.email}
                </Text>
            </Box>}

            <Avatar
                size="md"
                name="Marcio Camello"
                src="https://github.com/marciocamello.png"
                onClick={handleSignOut}
            />
        </Flex>
    )
}