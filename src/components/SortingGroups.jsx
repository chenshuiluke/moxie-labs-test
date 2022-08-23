import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import "../css/filter.scss";
import { faAngleUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Form, Level, Button, Dropdown, Icon } from "react-bulma-components";
import config from "../config";
const SortingGroups = ({ sortingGroups, setSortingGroups }) => {
  const [expanded, setExpanded] = useState(false);
  const content = useRef();
  const [availableFilterGenres, setAvailableFilterGenres] = useState([]);

  const handleCheckboxChange = (e, group, index) => {
    const checked = e.target.checked;
    const temp = [...sortingGroups];
    group.enabled = checked;
    temp[index] = group;

    setSortingGroups(temp);
  };

  const handleGenreChange = (value, group, index) => {
    const temp = [...sortingGroups];
    group.genre = value;
    temp[index] = group;

    setSortingGroups(temp);
  };

  const handleDirectionChange = (value, group, index) => {
    const temp = [...sortingGroups];
    group.direction = value;
    temp[index] = group;

    setSortingGroups(temp);
  };

  const addSortingGroup = () => {
    const temp = {
      enabled: false,
      genre: null,
      directin: "descending",
    };
    setSortingGroups([...sortingGroups, temp]);
  };

  useEffect(() => {
    const genresAlreadyBeingUsed = sortingGroups.map((group) => group.genre);

    const temp = config.genres.filter(
      (genre) => !genresAlreadyBeingUsed.includes(genre)
    );
    setAvailableFilterGenres(temp);
  }, [sortingGroups]);

  return (
    <div className="column is-half filter">
      <div className={"card " + (expanded ? "expanded" : "not-expanded")}>
        <header
          className="card-header"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <p className="card-header-title">Sorting Groups</p>
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
                {sortingGroups.map((group, index) => {
                  return (
                    <Level>
                      <Level.Item>
                        <Form.Checkbox
                          onChange={(e) =>
                            handleCheckboxChange(e, group, index)
                          }
                        >
                          Enabled
                        </Form.Checkbox>{" "}
                      </Level.Item>
                      <Level.Item>
                        <Dropdown
                          closeOnSelect={false}
                          color=""
                          value={group.genre}
                          icon={
                            <Icon>
                              <i
                                aria-hidden="true"
                                className="fas fa-angle-down"
                              />
                            </Icon>
                          }
                          label="Select Genre"
                          onChange={(e) => handleGenreChange(e, group, index)}
                        >
                          {config.genres
                            .filter((genre) => {
                              const isInOtherDropdown =
                                !availableFilterGenres.includes(genre);

                              return group.genre == genre || !isInOtherDropdown;
                            })
                            .map((genre) => {
                              return (
                                <Dropdown.Item renderAs="a" value={genre}>
                                  {genre}
                                </Dropdown.Item>
                              );
                            })}
                        </Dropdown>
                      </Level.Item>
                      <Level.Item>
                        <Dropdown
                          closeOnSelect={false}
                          color=""
                          value={group.direction}
                          icon={
                            <Icon>
                              <i
                                aria-hidden="true"
                                className="fas fa-angle-down"
                              />
                            </Icon>
                          }
                          label="Select Sort Order"
                          onChange={(e) =>
                            handleDirectionChange(e, group, index)
                          }
                        >
                          <Dropdown.Item renderAs="a" value={"ascending"}>
                            Ascending
                          </Dropdown.Item>
                          <Dropdown.Item renderAs="a" value={"descending"}>
                            Descending
                          </Dropdown.Item>
                        </Dropdown>
                      </Level.Item>
                    </Level>
                  );
                })}
                <Button
                  color="success"
                  renderAs="span"
                  onClick={addSortingGroup}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortingGroups;
