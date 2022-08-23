import { Form } from "react-bulma-components";
import { DebounceInput } from "react-debounce-input";
const Search = ({ setSearch }) => {
  return (
    <Form.Control>
      <DebounceInput
        className="input is-primary"
        placeholder="Search for film"
        minLength={2}
        debounceTimeout={300}
        onChange={(event) => setSearch(event.target.value)}
      />
    </Form.Control>
  );
};

export default Search;
