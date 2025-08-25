const lint = require("./lint")

const init = (config, mirrorzRepo) => {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  global.DOMParser = new JSDOM().window.DOMParser;

  Timeout = require("await-timeout");
  const timeout = 15000;
  global.Timeout = Timeout;
  global.timeout = timeout;

  fetch_extra = require("node-fetch-extra");
  const headers = new fetch_extra.Headers({
    'User-Agent': `mirrorz-parser/1.0 (+https://github.com/mirrorz-org/mirrorz-parser) ${config.url} ${mirrorzRepo}`,
  });
  async function fetchV6First (u, opt) {
    const promise = fetch_extra(u, { ...opt, family: 6, headers });
    return await Timeout.wrap(promise, timeout/10, 'Timeout').catch(async (e) => {
      const promise = fetch_extra(u, { ...opt, headers });
      return await Timeout.wrap(promise, timeout/3, 'Timeout').catch(() => null);
    });
  }
  global.fetch = fetchV6First;
};
const load = async (source) => {
  if (typeof(source) == "string") {
    const resp = await fetch(source);
    if (resp === null)
      return null;
    const json = await resp.json().catch(_ => null);
    if (json === null)
      return null;
    try {
      return lint(json);
    } catch (e) {
      return null;
    }
  } else {
    try {
      return await Timeout.wrap(source(), timeout, 'Timeout').catch(() => null);
    } catch (e) {
      return null;
    }
  }
}

module.exports = { init, load };
