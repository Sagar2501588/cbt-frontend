import imageUrlBuilder from "@sanity/image-url";

const projectId = "2rxx6xjj";
const dataset = "production";

const builder = imageUrlBuilder({ projectId, dataset });

export function urlFor(source) {
  return builder.image(source);
}