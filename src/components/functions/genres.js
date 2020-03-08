import React from "react";
import { Input } from "reactstrap";
export default function GenresOptions(onChange) {
  const genres = ["Random", "Rock", "EDM", "Rap", "Chill", "parti"];
  const genreItems = genres.map(genre => (
    <option key={genre} value={genre}>
      {genre}
    </option>
  ));
  return (
    <Input onChange={onChange} type="select" name="select" id="exampleSelect">
      {genreItems}
    </Input>
  );
}
