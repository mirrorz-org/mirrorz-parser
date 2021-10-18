const ideal_mirror = require("./ideal-mirror");

module.exports = async function (siteUrl) {
  const site = await (await fetch(siteUrl)).json();
  const info = [];
  let mirrors = await ideal_mirror("https://linux.xidian.edu.cn/mirrors/status.json");

  for (const m of mirrors) {
    m["help"] = "https://linux.xidian.edu.cn/git/xdlinux/mirror-help/src/master" + m.url + ".md";
  }

  return {
    site,
    info,
    mirrors,
  }
};
