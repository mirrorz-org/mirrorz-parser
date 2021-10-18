const lzu = require("./lzu");
const nju = require("./nju");
const neusoft = require("./neusoft");
const hust = require("./hust");
const tuna = require("./tuna");
const bfsu = require("./bfsu");
const nano = require("./nano");
const neo = require("./neo");
const hit = require("./hit");
const cqu = require("./cqu");
const xjtu = require("./xjtu");
const neu = require("./neu");
const nyist = require("./nyist");
const scau = require("./scau");
const zju = require("./zju");
const pku = require("./pku");
const byrio = require("./byrio");
const cqupt = require("./cqupt");
const ynuosa = require("./ynuosa");
const xtom_hk = require("./xtom-hk");
const xtom = require("./xtom");
const xtom_de = require("./xtom-de");
const xtom_nl = require("./xtom-nl");
const xtom_ee = require("./xtom-ee");
const njupt = require("./njupt");
const wsyu = require("./wsyu");
const bjtu = require("./bjtu");
const bupt = require("./bupt");
const sdu = require("./sdu");
const xidian = require("./xidian");

const config = require('./config.json')

const site = (abbr) => config.url + '/static/json/site/' + abbr + '.json';

module.exports = {
  "lzu"     : async () => lzu     (site("lzu"     )),
  "nju"     :             nju                       ,
  "neusoft" : async () => neusoft (site("neusoft" )),
  "hust"    : async () => hust    (site("hust"    )),
  "tuna"    : async () => tuna    (site("tuna"    )),
  "bfsu"    : async () => bfsu    (site("bfsu"    )),
  "nano"    : async () => nano    (site("nano"    )),
  "neo"     : async () => neo     (site("neo"     )),
  "hit"     : async () => hit     (site("hit"     )),
  "cqu"     : async () => cqu     (site("cqu"     )),
  "xjtu"    : async () => xjtu    (site("xjtu"    )),
  "neu"     : async () => neu     (site("neu"     )),
  "nyist"   : async () => nyist   (site("nyist"   )),
  "scau"    : async () => scau    (site("scau"    )),
  "zju"     : async () => zju     (site("zju"     )),
  "pku"     : async () => pku     (site("pku"     )),
  "byrio"   : async () => byrio   (site("byrio"   )),
  "cqupt"   : async () => cqupt   (site("cqupt"   )),
  "ynuosa"  : async () => ynuosa  (site("ynuosa"  )),
  "xtom-hk" : async () => xtom_hk (site("xtom-hk" )),
  "xtom"    : async () => xtom    (site("xtom"    )),
  "xtom-de" : async () => xtom_de (site("xtom-de" )),
  "xtom-nl" : async () => xtom_nl (site("xtom-nl" )),
  "xtom-ee" : async () => xtom_ee (site("xtom-ee" )),
  "njupt"   : async () => njupt   (site("njupt"   )),
  "wsyu"    :             wsyu                      ,
  "bjtu"    : async () => bjtu    (site("bjtu"    )),
  "bupt"    : async () => bjtu    (site("bupt"    )),
  "sdu"     : async () => sdu     (site("sdu"     )),
  "xidian"  : async () => xidian  (site("xidian"  )),
};
