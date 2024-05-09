import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./NavBar";
import GameGrid from "./GameGrid";
import GenreList from "./GenreList";
import { useState } from "react";
import { Genre } from "../hooks/useGenres";
import PlatformSelector from "./PlatformSelector";
import { Platform } from "../hooks/useGames";
import SortSelector from "./SortSelector";
import GameHeading from "./GameHeading";
import { useAuth } from "../hooks/useAuth";

export interface GameQuery {
    genre: Genre | null;
    platform: Platform | null;
    sortOrder: string;
    searchText: string;
}

const MainPage = () => {
    const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
    const { user } = useAuth();
    return (
        <Grid
            templateAreas={{
                base: `"nav" "main"`,
                lg: `"nav nav" "aside main"`,
            }}
            templateColumns={{
                base: "1fr",
                lg: "200px 1fr",
            }}
        >
            <GridItem area="nav">
                <NavBar
                    onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })} userName={""}                />
            </GridItem>
            <Show above="lg">
                <GridItem area="aside" paddingX={5}>
                    <GenreList
                        selectedGenre={gameQuery.genre}
                        onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
                    />
                </GridItem>
            </Show>

            <GridItem area="main">
                <Box paddingLeft={2}>
                    <GameHeading gameQuery={gameQuery} />
                    <Flex marginBottom={5}>
                        <Box marginRight={5}>
                            <PlatformSelector
                                selectedPlatform={gameQuery.platform}
                                onSelectPlatform={(platform) =>
                                    setGameQuery({ ...gameQuery, platform })
                                }
                            />
                        </Box>
                        <SortSelector
                            sortOrder={gameQuery.sortOrder}
                            onSelectSortOrder={(sortOrder) =>
                                setGameQuery({ ...gameQuery, sortOrder })
                            }
                        />
                    </Flex>
                </Box>
                <GameGrid gameQuery={gameQuery} />
            </GridItem>
        </Grid>
    );
};

export default MainPage;