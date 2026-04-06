const tunasync = require("./tunasync");

module.exports = async function (siteUrl) {
  const site = await (await fetch(siteUrl)).json();
  const github-release = await (await fetch("https://gitee.com/hust-open-atom-club/mirrorrequest/raw/master/tunasync-scripts/github-release.json")).json();
  const mirrors = await tunasync("https://mirrors.hust.edu.cn/status.json");

  // github-release
  const githubRelease = mirrors.find(m => m.options_name === "github-release");
  if (githubRelease) {
    github-release.forEach(item => {
      mirrors.push({
        cname: item.split('/').pop(),
        options_name: item.split('/').pop(),
        url: item,
        status: githubRelease.status
      });
    });
  }

  return {
    site,
    info: [],
    mirrors,
  }
};
