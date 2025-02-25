import { updatePost } from "../../api/post/update.js";
import { showOverlayModal } from "../../ui/global/modal.js";

/**
 * Opens the edit listing modal with pre-filled data.
 * @param {Object} listing - The listing data to edit.
 */
export function onUpdatePost(listing) {
  const existingModal = document.getElementById("edit-listing-modal");
  if (existingModal) existingModal.remove();

  const modalOverlay = document.createElement("div");
  modalOverlay.id = "edit-listing-modal";
  modalOverlay.className =
    "fixed inset-0 flex justify-center items-center bg-[#9AA2D5] bg-opacity-50 z-[9999]";

  const modalContent = document.createElement("div");
  modalContent.className =
    "bg-white p-6 rounded-lg shadow-lg z-[10000] w-9/10 sm:w-1/2 md:w-1/3 max-w-[700px] relative";

  const heading = document.createElement("h2");
  heading.className = "font-serif text-3xl font-bold text-center mb-5";
  heading.textContent = "Edit Listing";

  const closeButton = document.createElement("button");
  closeButton.innerHTML = "X";
  closeButton.className =
    "absolute top-4 right-4 text-charcoal-grey text-xl font-bold";
  closeButton.addEventListener("click", () => modalOverlay.remove());

  const form = document.createElement("form");
  form.className = "flex flex-col";
  form.id = "edit-listing-form";

  function createInput(labelText, id, type, value = "", isTextArea = false) {
    const label = document.createElement("label");
    label.className = "text-black font-inter font-semibold mt-4";
    label.textContent = labelText;
    label.setAttribute("for", id);

    let input;
    if (isTextArea) {
      input = document.createElement("textarea");
      input.textContent = value;
      input.className =
        "p-2 shadow-md rounded w-full h-[80px] bg-lavender-blue bg-opacity-20 placeholder-charcoal-grey placeholder:font-inter placeholder:text-sm";
    } else {
      input = document.createElement("input");
      input.type = type;
      input.value = value;
      input.className =
        "p-2 shadow-md rounded w-full h-[40px] bg-lavender-blue bg-opacity-20 placeholder-charcoal-grey placeholder:font-inter placeholder:text-sm";
    }

    input.id = id;
    input.name = id;

    return { label, input };
  }

  const { label: titleLabel, input: titleInput } = createInput(
    "Title",
    "title",
    "text",
    listing.title
  );

  const { label: descriptionLabel, input: descriptionInput } = createInput(
    "Description",
    "description",
    "text",
    listing.description,
    true
  );

  const { label: imageUrlLabel, input: imageUrlInput } = createInput(
    "Image URL",
    "imageUrl",
    "text",
    listing.media[0]?.url || ""
  );

  const imageAltLabel = document.createElement("label");
  imageAltLabel.className = "sr-only";
  imageAltLabel.setAttribute("for", "imageAlt");
  imageAltLabel.textContent = "Image Alt Text";

  const imageAltInput = document.createElement("input");
  imageAltInput.type = "text";
  imageAltInput.id = "imageAlt";
  imageAltInput.name = "imageAlt";
  imageAltInput.placeholder = "Enter image alt text";
  imageAltInput.value = listing.media[0]?.alt || "";
  imageAltInput.className =
    "p-2 shadow-md rounded w-full h-[40px] bg-lavender-blue bg-opacity-20 placeholder-charcoal-grey placeholder:font-inter placeholder:text-sm mt-2";

  const { label: tagsLabel, input: tagsInput } = createInput(
    "Tags",
    "tags",
    "text",
    listing.tags.join(", ")
  );

  const { label: endsAtLabel, input: endsAtInput } = createInput(
    "Choose when the bid ends",
    "endsAt",
    "datetime-local",
    new Date(listing.endsAt).toISOString().slice(0, 16)
  );

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "flex items-center gap-2 mt-4";

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.className =
    "bg-royal-blue text-white text-lg font-serif font-bold px-3 py-2 rounded h-[40px] flex items-center justify-center";
  saveButton.textContent = "Save";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className =
    "bg-[#9AA2D5] text-black text-lg font-serif font-bold px-3 py-2 rounded h-[40px] flex items-center justify-center";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => modalOverlay.remove());

  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(cancelButton);

  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(descriptionLabel);
  form.appendChild(descriptionInput);
  form.appendChild(imageUrlLabel);
  form.appendChild(imageUrlInput);
  form.appendChild(imageAltLabel);
  form.appendChild(imageAltInput);
  form.appendChild(tagsLabel);
  form.appendChild(tagsInput);
  form.appendChild(endsAtLabel);
  form.appendChild(endsAtInput);
  form.appendChild(buttonContainer);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const updatedListing = {
      title: titleInput.value.trim(),
      description: descriptionInput.value.trim(),
      tags: tagsInput.value.split(",").map((tag) => tag.trim()),
      media: [
        { url: imageUrlInput.value.trim(), alt: imageAltInput.value.trim() },
      ],
      endsAt: new Date(endsAtInput.value).toISOString(),
    };

    try {
      await updatePost(listing.id, updatedListing);
      showOverlayModal("Listing updated successfully!");
      modalOverlay.remove();
      setTimeout(() => location.reload(), 1500);
    } catch (error) {
      showOverlayModal("Failed to update listing.");
    }
  });

  modalContent.appendChild(closeButton);
  modalContent.appendChild(heading);
  modalContent.appendChild(form);
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
}
