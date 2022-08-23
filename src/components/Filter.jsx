import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import "../css/filter.scss";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bulma-components";
import config from "../config";
import { DebounceInput } from "react-debounce-input";
const Filter = ({
  selectedGenres,
  setSelectedGenres,
  yearFilter,
  setYearFilter,
  minRuntime,
  maxRuntime,
  setMinRuntime,
  setMaxRuntime,
}) => {
  const [expanded, setExpanded] = useState(false);

  const content = useRef();

  const handleFilterChange = (e, genre) => {
    const checked = e.target.checked;
    let selected = [...selectedGenres];
    if (checked) {
      selected.push(genre);
    } else {
      selected = selected.filter((element) => element != genre);
    }
    setSelectedGenres(selected);
  };
  const handleYearSearch = (e) => {
    const limit = 4;
    setYearFilter(e.target.value.slice(0, limit));
  };

  const handleMinRuntime = (e) => {
    const limit = 4;
    setMinRuntime(e.target.value.slice(0, limit));
  };

  const handleMaxRuntime = (e) => {
    const limit = 4;
    setMaxRuntime(e.target.value.slice(0, limit));
  };
  return (
    <div className="column is-half filter">
      <div className={"card " + (expanded ? "expanded" : "not-expanded")}>
        <header
          className="card-header"
          onClick={() => {
            setExpanded(!expanded);
            if (!expanded == true) {
              setSelectedGenres([]);
              setYearFilter("");
              setMaxRuntime("");
              setMaxRuntime("");
            }
          }}
        >
          <p className="card-header-title">Filter</p>
          <a className="card-header-icon">
            <span className="icon">
              <FontAwesomeIcon icon={faAngleUp} />
            </span>
          </a>
        </header>
        <div className="card-content">
          {expanded && (
            <>
              <div className="content" ref={content}>
                <p>
                  <strong>Genre:</strong>
                </p>
                {config.genres.map((genre) => {
                  return (
                    <>
                      <Form.Checkbox
                        key={genre}
                        onChange={(e) => handleFilterChange(e, genre)}
                      >
                        {genre}
                      </Form.Checkbox>{" "}
                    </>
                  );
                })}
                <br />
                <br />
                <p>
                  <strong>Year:</strong>
                  <input
                    className="input is-primary"
                    onChange={handleYearSearch}
                    value={yearFilter}
                    type="number"
                    placeholder={"YYYY"}
                  />
                </p>
                <br />
                <br />
                <p>
                  <strong>Runtime (minutes):</strong>
                </p>
                <input
                  className="input is-primary"
                  onChange={handleMinRuntime}
                  value={minRuntime}
                  type="number"
                />
                -
                <input
                  className="input is-primary"
                  onChange={handleMaxRuntime}
                  value={maxRuntime}
                  type="number"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
