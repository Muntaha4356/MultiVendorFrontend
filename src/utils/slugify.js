export const slugify = (value = "") =>
  value.toString().trim().toLowerCase().replace(/\s+/g, "-");

export const matchesProductRoute = (item, routeParam) => {
  if (!item || !routeParam) return false;
  return item._id === routeParam || slugify(item.name) === slugify(routeParam);
};
