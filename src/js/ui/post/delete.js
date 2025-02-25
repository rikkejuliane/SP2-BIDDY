import { deletePost } from "../../api/post/delete.js";
import { showOverlayModal, showActionModal } from "../../ui/global/modal.js";

/**
 * Handles deleting a listing with a confirmation modal.
 * @param {string} listingId - The ID of the listing to delete.
 */
export async function onDeletePost(listingId) {
  showActionModal("Are you sure you want to delete this listing?", [
    {
      text: "Yes",
      className:
        "bg-royal-blue text-white text-lg font-serif font-bold px-3 py-2 rounded w-[100px] h-[40px] flex items-center justify-center",
      onClick: async () => {
        try {
          await deletePost(listingId);
          showOverlayModal("Listing deleted successfully!");
          setTimeout(() => location.reload(), 1500);
        } catch (error) {
          showOverlayModal("Failed to delete listing.");
        }
      },
    },
    {
      text: "No",
      className:
        "bg-[#CA2525] text-white text-lg font-serif font-bold px-3 py-2 rounded w-[100px] h-[40px] flex items-center justify-center",
    },
  ]);
}
