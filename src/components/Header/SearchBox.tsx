import { Flex, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
    const [search, setSearch] = useState("");

    //debounce the search
    const handleSearch = (e: any) => {
        setSearch(e.target.value);
    };

    return (
        <Flex
            as="label"
            flex="1"
            py="4"
            px="8"
            ml="6"
            maxWidth={400}
            alignSelf="center"
            color="gray.200"
            position="relative"
            backgroundColor="gray.800"
            borderRadius="full"
        >
            <Input
                color="gray.50"
                variant="unstyled"
                px="4"
                mr="4"
                placeholder="Search"
                _placeholder={{
                    color: "gray.400",
                }}
                value={search}
                onChange={handleSearch}
            />

            <Icon
                as={RiSearchLine}
                fontSize="20"
            />
        </Flex>
    )
}