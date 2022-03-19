import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
    return (
        <Flex
            align="center"
        >
            <Box
                mr="4"
                textAlign="right"
            >
                <Text>Marcio Camello</Text>
                <Text color="gray.300" fontSize="small">
                    mac3designer@gmail.com
                </Text>
            </Box>

            <Avatar
                size="md"
                name="Marcio Camello"
                src="https://github.com/marciocamello.png"
            />
        </Flex>
    )
}