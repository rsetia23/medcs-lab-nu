// src/sanityClient.js
import { createClient } from "@sanity/client";

export default createClient({
  projectId: "vb5kghfa",
  dataset: "production",
  apiVersion: "2025-07-24",
  useCdn: true,
});
