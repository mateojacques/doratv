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
import language_codes from "../../utils/languages.json";
import { TvContext } from "../../contexts/tvContext";
import config from "../../config/config";

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
  const [searchValue, setSearchValue] = useState("");
  const [autoCompleteValue, setautoCompleteValue] = useState("");
  const [appliedFilters, setAppliedFilters] = useState([]);

  function handleChangeFilterInput(newValue) {
    setSearchValue(String(newValue));
  }

  function handleChangeFilterAutoComplete(newValue) {
    if (newValue) {
      setSearchValue(newValue.label);
      setautoCompleteValue(String(newValue.label));
    }
  }

  function sortArrayByString(a, b) {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  }

  function handleDeleteActiveFilter(filter) {
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

  let deleteGameFilterProps = {};
  let deleteLanguageFilterProps = {};

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
        baseUrl: `${TWITCH_API_BASE_URL}`,
        method: "get",
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
    <Box className="panel-filter-container" container>
      <Box
        container
        item
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
                label={
                  language_codes.find(
                    (language) => language.code === activeLanguage
                  ).name
                }
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
          onChange={(e, newValue) => handleChangeFilterAutoComplete(newValue)}
          inputValue={searchValue || ""}
          onInputChange={(e) => e && handleChangeFilterInput(e.target.value)}
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
          {language_codes
            .sort((a, b) => sortArrayByString(a, b))
            .map(({ code, name }) => (
              <MenuItem key={code} value={code}>
                {name}
              </MenuItem>
            ))}
        </Select>
      </Box>
    </Box>
  );
};

export default Filter;
