const tunasync = require("./tunasync");

module.exports = async function (siteUrl) {
  const site = await (await fetch(siteUrl)).json();
  let mirrors = await tunasync("https://raw.githubusercontent.com/nanami233333/STATIC/refs/heads/main/mirror.json");
  return {
    site,
    mirrors,
  }
};
