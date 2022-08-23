import logo from "./logo.svg";
import "./App.css";
import { getFilm, getTop250Films, searchFilms } from "./api/films";
import { useEffect, useState } from "react";
import { Container, Control, Input } from "react-bulma-components";
import "bulma/css/bulma.min.css";
import LazyLoad from "react-lazyload";
import Film from "./components/Film";
import Filter from "./components/Filter";
import { forceCheck } from "react-lazyload";
import _ from "lodash";
import SortingGroups from "./components/SortingGroups";
import Group from "./components/Group";
import Search from "./components/Search";
import SquareLoader from "react-spinners/SquareLoader";

function App() {
  const [films, setFilms] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortingGroups, setSortingGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [minRuntime, setMinRuntime] = useState("");
  const [maxRuntime, setMaxRuntime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTopFilms();
  }, []);

  useEffect(() => {
    setFilms([...films]);
  }, [selectedGenres, yearFilter, minRuntime, maxRuntime]);

  useEffect(() => {
    setFilteredGroups(sortingGroups.filter(groupFilterFunc));
    forceCheck();
  }, [sortingGroups]);

  useEffect(() => {
    if (search != null && search != "") {
      loadSearch();
    }
  }, [search]);

  const loadTopFilms = async () => {
    try {
      const result = await getTop250Films();
      const fullFilms = [];
      for (let row of result) {
        const full = await getFilm(row.id);
        fullFilms.push({
          ...row,
          ...full,
        });
      }
      console.log(fullFilms);
      setFilms([...fullFilms]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSearch = async () => {
    try {
      setLoading(true);
      const result = await searchFilms(search);

      const fullFilms = [];
      for (let row of result) {
        const full = await getFilm(row.id);
        fullFilms.push({
          ...row,
          ...full,
        });
      }
      console.log(fullFilms);
      setFilms([...fullFilms]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterFilms = (film) => {
    let hasGenresInFilter = true;
    let isInYear = true;
    let isWithinMinRuntime = true;
    let isWithinMaxRuntime = true;
    if (selectedGenres?.length > 0 && film.genreList != null) {
      hasGenresInFilter = selectedGenres.reduce((acc, el) => {
        return acc && film.genreList.map((genre) => genre.key).includes(el);
      }, true);
    }
    if (yearFilter?.length > 0) {
      isInYear = film.year == yearFilter;
    }

    if (minRuntime?.length > 0) {
      isWithinMinRuntime = parseInt(minRuntime) <= parseInt(film.runtimeMins);
    }
    if (maxRuntime?.length > 0) {
      isWithinMaxRuntime = parseInt(maxRuntime) >= parseInt(film.runtimeMins);
    }

    return (
      hasGenresInFilter && isInYear && isWithinMaxRuntime && isWithinMinRuntime
    );
  };

  const groupFilterFunc = (group) => {
    return group.enabled && group.genre != null && group.direction != null;
  };

  return (
    <div className="App">
      <Container breakpoint={"widescreen"}>
        <Filter
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          setYearFilter={setYearFilter}
          yearFilter={yearFilter}
          setMinRuntime={setMinRuntime}
          setMaxRuntime={setMaxRuntime}
          minRuntime={minRuntime}
          maxRuntime={maxRuntime}
        />

        <SortingGroups
          sortingGroups={sortingGroups}
          setSortingGroups={setSortingGroups}
        />

        <Search setSearch={setSearch} />
        <br />
        <SquareLoader loading={loading} color={"#36d7b7"} />
        {filteredGroups?.length == 0 &&
          films.filter(filterFilms).map((film) => {
            return (
              <LazyLoad key={film.id} height={200}>
                <Film filmObj={film}></Film>
              </LazyLoad>
            );
          })}

        {filteredGroups?.length > 0 && (
          <>
            {filteredGroups.map((group) => {
              return <Group films={films.filter(filterFilms)} group={group} />;
            })}
          </>
        )}
        {forceCheck()}
      </Container>
    </div>
  );
}

export default App;
