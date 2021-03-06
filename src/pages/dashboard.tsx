import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Can } from "../components/Acl/Can";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const options = {
    chart: {
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        },
        foreColor: theme.colors.gray[500]
    },
    grid: {
        show: false
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        enabled: false
    },
    xaxis: {
        type: "datetime",
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            '2021-01-01T00:00:00.000Z',
            '2021-01-02T00:00:00.000Z',
            '2021-01-03T00:00:00.000Z',
            '2021-01-04T00:00:00.000Z',
            '2021-01-05T00:00:00.000Z',
            '2021-01-06T00:00:00.000Z',
            '2021-01-07T00:00:00.000Z',
        ]
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3,
        }
    }
} as ApexOptions;

const series = [
    {
        name: 'series-1',
        data: [31, 40, 28, 51, 42, 109, 100]
    }
];

export default function Dashboard() {

    const userCanSeeMetrics = useCan({
        roles: ["administrator", "editor"]
    });

    return (
        <Flex direction="column" h="100vh" >
            <Header />

            <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <SimpleGrid
                    flex="1"
                    gap="4"
                    minChildWidth="320px"
                    alignItems="flex-start"
                >
                    {userCanSeeMetrics && <Box
                        p={["6", "8"]}
                        bg="gray.800"
                        borderRadius={8}
                    >
                        <Text fontSize="lg" mb="4">Inscritos da semana</Text>
                        <Chart
                            options={options}
                            series={series}
                            type="area"
                        />
                    </Box>}
                    <Can
                        permissions={["users.create"]}
                    >
                        <Box
                            p={["6", "8"]}
                            bg="gray.800"
                            borderRadius={8}
                        >
                            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
                            <Chart
                                options={options}
                                series={series}
                                type="area"
                            />
                        </Box>
                    </Can>
                </SimpleGrid>
            </Flex>
        </Flex >
    )
}

export const getServerSideProps = withSSRAuth<{ users: string[] }>(async (context) => {
    const apiClient = setupAPIClient(context);

    const response = await apiClient.get('/me');
    console.log(response.data);

    return {
        props: {
            users: [""]
        }
    }
})