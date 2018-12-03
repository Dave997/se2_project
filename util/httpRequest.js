const fetch = require("node-fetch");

async function Get(url) {
  return fetch(url);
}

async function PostJson(url, json) {
  let res = fetch(url, {
          method: 'post',
          body:    JSON.stringify(json),
          headers: { 'Content-Type': 'application/json' },
      });
  return res;
}

async function PutJson(url, json) {
  let res = fetch(url, {
          method: 'put',
          body:    JSON.stringify(json),
          headers: { 'Content-Type': 'application/json' },
      });
  return res;
}

async function Delete(url) {
  return  fetch(url, {method:'delete'});
}

module.exports = {Get, PostJson, PutJson, Delete};