/**
 * Creates and displays a full-page overlay modal with a message.
 *
 * @param {string} message - The text to display in the modal.
 * @param {number} [timeout=3000] - The time in milliseconds before the modal disappears.
 */
export function showOverlayModal(message, timeout = 3000) {
  // Remove existing modal if one is already open
  const existingModal = document.getElementById("custom-modal");
  if (existingModal) {
      existingModal.remove();
  }

  // Create modal overlay
  const modalOverlay = document.createElement("div");
  modalOverlay.id = "custom-modal";
  modalOverlay.className = "fixed inset-0 flex justify-center items-center bg-[#9AA2D5] bg-opacity-50 z-[9999]";

  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.className = "bg-white p-6 rounded-lg shadow-lg text-center z-[10000]";

  // Create heading
  const heading = document.createElement("h2");
  heading.className = "text-black font-serif text-lg font-bold";
  heading.textContent = message;

  // Append elements
  modalContent.appendChild(heading);
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  // Automatically remove modal after the timeout
  setTimeout(() => {
      modalOverlay.remove();
  }, timeout);
}

/**
 * Creates and displays an action modal with a message and dynamic buttons.
 *
 * @param {string} message - The text to display in the modal.
 * @param {Array} buttons - An array of button objects with { text, onClick, className }.
 */
export function showActionModal(message, buttons = []) {
  // Remove existing modal if one is already open
  const existingModal = document.getElementById("custom-modal");
  if (existingModal) {
      existingModal.remove();
  }

  // Create modal overlay
  const modalOverlay = document.createElement("div");
  modalOverlay.id = "custom-modal";
  modalOverlay.className = "fixed inset-0 flex justify-center items-center bg-[#9AA2D5] bg-opacity-50 z-[9999]";

  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.className = "bg-white m-12 p-12 rounded-lg shadow-lg text-center z-[10000] flex flex-col items-center";

  // Create heading
  const heading = document.createElement("h2");
  heading.className = "text-black font-serif text-lg font-bold";
  heading.textContent = message;

  // Create buttons container
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "mt-2 flex gap-4";

  // Add buttons
  buttons.forEach(({ text, onClick, className }) => {
      const button = document.createElement("button");
      button.textContent = text;
      button.className = className || "bg-royal-blue text-white text-lg font-serif font-bold px-2 py-1 rounded w-[100px] h-[30px] items-center";
      button.addEventListener("click", () => {
          if (onClick) onClick();
          modalOverlay.remove(); // Close modal after button click
      });
      buttonContainer.appendChild(button);
  });

  // Append elements
  modalContent.appendChild(heading);
  modalContent.appendChild(buttonContainer);
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
}