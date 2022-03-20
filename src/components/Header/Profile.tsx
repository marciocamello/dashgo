import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
    return (
        <Flex
            align="center"
        >
            {showProfileData && <Box
                mr="4"
                textAlign="right"
            >
                <Text>Marcio Camello</Text>
                <Text color="gray.300" fontSize="small">
                    mac3designer@gmail.com
                </Text>
            </Box>}

            <Avatar
                size="md"
                name="Marcio Camello"
                src="https://github.com/marciocamello.png"
            />
        </Flex>
    )
}