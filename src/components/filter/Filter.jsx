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
import { DEFAULT_LANGUAGE } from "../../utils/constants";
import { getAll639_1, getEnglishName } from "all-iso-language-codes";
import { TvContext } from "../contexts/tvContext";

const language_codes = getAll639_1();

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
  const [appliedFilters, setAppliedFilters] = useState({});
  const [autoCompleteValue, setautoCompleteValue] = useState("");

  function handleChangeFilterInput(newValue) {
    setSearchValue(String(newValue));
  }

  function handleChangeFilterAutoComplete(newValue) {
    if (newValue) {
      setSearchValue(newValue.label);
      setautoCompleteValue(String(newValue.label));
    }
  }

  useEffect(() => {
    if (searchValue) {
      fetchSearchResults({
        baseUrl: `${process.env.REACT_APP_TWITCH_API_BASE_URL}`,
        method: "get",
        url: `/search/categories?query=${searchValue}`,
      });
    }
  }, [searchValue]);

  useEffect(() => {
    if (autoCompleteValue && fetchTwitchGame) {
      fetchTwitchGame({
        baseUrl: `${process.env.REACT_APP_TWITCH_API_BASE_URL}`,
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
    if (activeGame) setAppliedFilters({ ...appliedFilters, activeGame });
  }, [activeGame]);

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
          <Chip
            key={activeGame && activeGame.id}
            label={activeGame && activeGame.name}
            sx={{
              background: "var(--bg-secondary)",
            }}
          />
          <Chip
            key={activeLanguage}
            label={getEnglishName(activeLanguage)}
            sx={{
              background: "var(--bg-secondary)",
            }}
          />
        </ListItem>

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
          value={activeLanguage || DEFAULT_LANGUAGE}
          label="Age"
          onChange={(e) => setActiveLanguage(e.target.value)}
          sx={{ color: "var(--primary-text)" }}
        >
          {language_codes.map((code) => (
            <MenuItem key={code} value={code}>
              {getEnglishName(code)}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default Filter;
