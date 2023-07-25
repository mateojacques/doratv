import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Chip,
  MenuItem,
  ListItem,
  Select,
} from "@mui/material";
import LANGUAGES from "../../utils/languages";
import { TvContext } from "../../contexts/tvContext";
import config from "../../config/config";
import { IAutocompleteValue } from "../../interfaces/formInterfaces";
import { sortArrayByString } from "../../utils/sort";
import { GET } from "../../utils/constants";

const { TWITCH_API_BASE_URL } = config;

const Filter = () => {
  const {
    activeGame,
    setActiveGame,
    activeLanguage,
    setActiveLanguage,
    fetchSearchResults,
    searchResults,
    twitchGame,
    fetchTwitchGame,
  } = useContext(TvContext);
  const [searchValue, setSearchValue] = useState<string>("");
  // TODO refactor filters and its interfaces
  const [autoCompleteValue, setAutoCompleteValue] = useState<any>("");
  const [appliedFilters, setAppliedFilters] = useState<any[]>([]);

  const activeLanguageName = LANGUAGES.find(
    ({ code }) => code === activeLanguage
  )?.name;

  function handleChangeFilterInput(newValue: string) {
    setSearchValue(String(newValue));
  }

  function handleChangeFilterAutoComplete(newValue: IAutocompleteValue) {
    if (newValue) {
      setSearchValue(newValue.label);
      setAutoCompleteValue(String(newValue.label));
    }
  }

  function handleDeleteActiveFilter(filter: string) {
    // TODO refactor filters
    localStorage.removeItem(filter);
    if (filter === "gameFromFilter") {
      setActiveGame(null);
      setAppliedFilters(appliedFilters.filter((i) => i !== "game"));
    }
    if (filter === "languageFromFilter") {
      setActiveLanguage(null);
      setAppliedFilters(appliedFilters.filter((i) => i !== "language"));
    }
  }

  let deleteGameFilterProps: any = {};
  let deleteLanguageFilterProps: any = {};

  if (activeGame)
    deleteGameFilterProps.onDelete = () =>
      handleDeleteActiveFilter("gameFromFilter");

  if (activeLanguage)
    deleteLanguageFilterProps.onDelete = () =>
      handleDeleteActiveFilter("languageFromFilter");

  useEffect(() => {
    if (searchValue) {
      fetchSearchResults({
        baseUrl: `${TWITCH_API_BASE_URL}`,
        method: "get",
        url: `/search/categories?query=${searchValue}`,
      });
    }
  }, [searchValue]);

  useEffect(() => {
    if (autoCompleteValue && fetchTwitchGame) {
      fetchTwitchGame({
        baseUrl: TWITCH_API_BASE_URL,
        method: GET,
        url: `/games?name=${autoCompleteValue}`,
      });
    }
  }, [autoCompleteValue]);

  useEffect(() => {
    if (twitchGame && twitchGame.data) {
      localStorage.setItem(
        "gameFromFilter",
        JSON.stringify(twitchGame.data[0])
      );
      setActiveGame(twitchGame.data[0]);
    }
  }, [twitchGame]);

  useEffect(() => {
    if (activeGame && !appliedFilters.includes("game"))
      setAppliedFilters([...appliedFilters, "game"]);
  }, [appliedFilters, activeGame]);

  useEffect(() => {
    if (activeLanguage) {
      localStorage.setItem("languageFromFilter", activeLanguage);
      if (!appliedFilters.includes("language"))
        setAppliedFilters([...appliedFilters, "language"]);
    }
  }, [activeLanguage]);

  return (
    <Box className="panel-filter-container">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="start"
        padding={3}
        sx={{ gap: 3 }}
        className="panel-filter"
      >
        {appliedFilters.length > 0 && (
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              listStyle: "none",
              p: 1,
              borderRadius: 15,
              gap: 1,
            }}
          >
            {activeGame && (
              <Chip
                key={activeGame.id}
                label={activeGame.name}
                sx={{
                  background: "var(--bg-secondary)",
                }}
                {...deleteGameFilterProps}
              />
            )}

            {activeLanguage && activeLanguage !== " " && (
              <Chip
                key={activeLanguage}
                label={activeLanguageName}
                sx={{
                  background: "var(--bg-secondary)",
                }}
                {...deleteLanguageFilterProps}
              />
            )}
          </ListItem>
        )}

        <Autocomplete
          disablePortal
          disableClearable
          id="filter-autocomplete"
          isOptionEqualToValue={() => true}
          value={autoCompleteValue}
          onChange={(e, newValue: any) =>
            handleChangeFilterAutoComplete(newValue)
          }
          inputValue={searchValue || ""}
          onInputChange={(e: any) =>
            e && handleChangeFilterInput(e.target.value)
          }
          options={
            searchResults
              ? searchResults.map(({ id, name }) => ({ id, label: name }))
              : []
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search by game name..."
              label="Game"
              sx={{ color: "var(--primary-text)" }}
            />
          )}
        />

        <Select
          id="filter-language"
          value={activeLanguage || " "}
          label="Age"
          onChange={(e) => setActiveLanguage(e.target.value)}
          sx={{ color: "var(--primary-text)" }}
        >
          {LANGUAGES.sort((a, b) => sortArrayByString(a, b)).map(
            ({ code, name }) => (
              <MenuItem key={code} value={code}>
                {name}
              </MenuItem>
            )
          )}
        </Select>
      </Box>
    </Box>
  );
};

export default Filter;
