// utils.js
export function getInitials(name) {
  let rgx = /\b\p{L}/gu;

  return (name.match(rgx) || []).map((match) => match.toUpperCase()).join("");
}
