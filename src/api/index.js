import ky from "ky";
import config from "../config";
const api = ky.extend({
  prefixUrl: config.IMDB_API_URL,
  throwHttpErrors: false,
  hooks: {
    afterResponse: [async (_request, _options, response) => {}],
  },
});

export default api;
