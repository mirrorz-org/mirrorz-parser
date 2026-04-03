const lint = require("./lint");

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
    "User-Agent": `mirrorz-parser/1.0 (+https://github.com/mirrorz-org/mirrorz-parser) ${config.url} ${mirrorzRepo}`,
  });
  async function fetchV6First(u, opt) {
    const url = typeof u === "string" ? u : (u?.url ?? String(u));

    const mkTimeoutErr = (label, ms) =>
      new Error(`fetchV6First ${label} timeout after ${ms}ms: ${url}`);

    const v6ms = Math.floor(timeout / 10);
    const fbms = Math.floor(timeout / 3);

    let v6err;
    try {
      return await Timeout.wrap(
        fetch_extra(u, { ...opt, family: 6, headers }),
        v6ms,
        mkTimeoutErr("(IPv6)", v6ms),
      );
    } catch (e) {
      v6err = e;
    }

    try {
      return await Timeout.wrap(
        fetch_extra(u, { ...opt, headers }),
        fbms,
        mkTimeoutErr("(fallback)", fbms),
      );
    } catch (fberr) {
      const err = new Error(
        `fetchV6First failed for ${url}\n` +
          `  IPv6 attempt error: ${v6err?.stack || v6err}\n` +
          `  Fallback attempt error: ${fberr?.stack || fberr}`,
      );
      err.cause = fberr; // keeps the final failure as the cause
      err.attempts = [v6err, fberr];
      throw err;
    }
  }
  global.fetch = fetchV6First;
};
const load = async (source) => {
  if (typeof source == "string") {
    const resp = await fetch(source);
    if (resp === null) return null;
    const json = await resp.json().catch((_) => null);
    if (json === null) return null;
    try {
      return lint(json);
    } catch (e) {
      return null;
    }
  } else {
    try {
      return await Timeout.wrap(source(), timeout, "Timeout").catch(() => null);
    } catch (e) {
      return null;
    }
  }
};

module.exports = { init, load };
