import { createPost } from "../../api/post/create.js";

/**
 * Handles the form submission to create a new listing.
 *
 * @param {Event} event - The form submission event.
 */
export async function onCreatePost(event) {
  event.preventDefault();

  const form = event.target;
  const title = form.elements.title.value.trim();
  const description = form.elements.description.value.trim();
  const imageUrl = form.elements.imageUrl.value.trim();
  const imageAlt = form.elements.imageAlt.value.trim();
  const tags = form.elements.tags.value.trim().split(",").map(tag => tag.trim());
  const endsAt = new Date(form.elements.endsAt.value).toISOString();

  if (!title || !endsAt) {
    alert("⚠️ Title and ending date are required!");
    return;
  }

  const listingData = {
    title,
    description,
    tags,
    media: imageUrl ? [{ url: imageUrl, alt: imageAlt || "No alt text" }] : [],
    endsAt,
  };

  try {
    const createdListing = await createPost(listingData);
    if (createdListing) {
      window.location.href = `/post/?id=${createdListing.id}`; // Redirect to listing page
    }
  } catch (error) {
    console.error("❌ Failed to create listing:", error);
  }
}
