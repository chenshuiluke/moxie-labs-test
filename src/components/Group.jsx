import _ from "lodash";
import { Container, Tag } from "react-bulma-components";
import Film from "./Film";
import LazyLoad from "react-lazyload";
import { forceCheck } from "react-lazyload";
const Group = ({ films, group }) => {
  const groupFilterFunc = (film) => {
    const list = film.genreList.map((genre) => genre.key);
    return list.includes(group.genre);
  };
  const groupSortFunc = (a, b) => {
    var nA = a.fullTitle.toLowerCase();
    var nB = b.fullTitle.toLowerCase();

    if (nA < nB) return group.direction === "ascending" ? -1 : 1;
    else if (nA > nB) return group.direction === "ascending" ? 1 : -1;
    return 0;
  };
  return (
    <>
      <Tag>{group.genre}</Tag>
      {films
        .filter(groupFilterFunc)
        .sort(groupSortFunc)
        .map((film) => {
          return (
            <LazyLoad key={film.id} height={200}>
              <Film filmObj={film}></Film>
            </LazyLoad>
          );
        })}
    </>
  );
};

export default Group;
