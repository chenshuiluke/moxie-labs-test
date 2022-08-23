import { useEffect, useState } from "react";
import { Content, Media, Image, Box, Section } from "react-bulma-components";
import { getFilm } from "../api/films";
const Film = ({ filmObj }) => {
  return (
    filmObj != null &&
    filmObj.directorList != null && (
      <>
        <Section>
          <Box>
            <Media renderAs="article">
              <Media.Item align="left">
                <Image src={filmObj.image} size={64} />
              </Media.Item>
              <Media.Item align="center">
                <Content>
                  <p>
                    <strong>{filmObj.fullTitle}</strong>
                  </p>
                  Rank: {filmObj.rank} | Directors:{" "}
                  {filmObj.directorList.map((director, index) => {
                    return (
                      <>
                        {director.name}
                        {index < filmObj.directorList.length - 1 ? ", " : ""}
                      </>
                    );
                  })}{" "}
                  | Release Year: {filmObj.year} | Genres:{" "}
                  {filmObj.genreList.map((genre, index) => {
                    return (
                      <>
                        {genre.key}
                        {index < filmObj.genreList.length - 1 ? ", " : ""}
                      </>
                    );
                  })}
                  <br />
                  Languages: {filmObj.languages}
                  <br />
                  Content Rating: {filmObj.contentRating}
                  <br />
                  Runtime: {filmObj.runtimeStr}
                  <br />
                  Countries: {filmObj.countries}
                </Content>
              </Media.Item>
            </Media>
          </Box>
        </Section>
      </>
    )
  );
};

export default Film;
