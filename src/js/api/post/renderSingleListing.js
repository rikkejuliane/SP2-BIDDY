import { handleBidPlacement } from "./placeBid";
import { showActionModal, showOverlayModal } from "../../ui/global/modal";

/**
 * Renders a single listing card element.
 *
 * @param {Object} listing - The listing data object.
 * @param {boolean} isLoggedIn - Indicates whether the user is logged in.
 * @returns {HTMLElement} - The generated single listing card element.
 */
export function renderSingleListing(listing, isLoggedIn) {
  const {
    id,
    title,
    description,
    tags = [],
    media = [],
    created,
    endsAt,
    bids = [],
    seller = {},
  } = listing;

  const card = document.createElement("div");
  card.className = "w-[500px] h-auto bg-white rounded-2xl shadow-lg overflow-hidden";

  // User Info
  const userInfo = document.createElement("div");
userInfo.className = "flex items-center gap-2 p-3 cursor-pointer";
userInfo.addEventListener("click", () => {
  const loggedInUsername = localStorage.getItem("username");
  if (seller.name === loggedInUsername) {
    window.location.href = "/profile/";
  } else {
    window.location.href = `/profile/?user=${seller.name}`;
  }
});

  const avatar = document.createElement("img");
  avatar.src = seller?.avatar?.url || "/images/default-avatar.png";
  avatar.alt = `${seller?.name || "Unknown"}'s avatar`;
  avatar.className = "w-10 h-10 rounded-full object-cover";

  const username = document.createElement("span");
  username.className = "font-bold";
  username.textContent = seller?.name || "Unknown";

  userInfo.appendChild(avatar);
  userInfo.appendChild(username);

  // Listing Image
  const listingImage = document.createElement("img");
  listingImage.src = media?.[0]?.url || "/images/placeholder.png";
  listingImage.alt = title;
  listingImage.className = "w-[500px] h-[300px] object-cover";

  // Tags & End Date
  const tagBar = document.createElement("div");
  tagBar.className = "w-full h-[30px] bg-lavender-blue bg-opacity-50 flex justify-between items-center px-3 text-sm text-black";

  const tagSpan = document.createElement("span");
  tagSpan.className = "italic font-inter";
  tagSpan.textContent = tags.length > 0 ? tags[0] : "No tags";

  const endDate = document.createElement("span");
  endDate.className = "font-semibold font-inter";
  endDate.textContent = `Bidding ends: ${new Date(endsAt).toLocaleDateString()}`;

  tagBar.appendChild(tagSpan);
  tagBar.appendChild(endDate);

  // Title & Description
  const details = document.createElement("div");
  details.className = "w-[95%] p-3 flex justify-center flex-col mx-auto";

  const titleElement = document.createElement("h3");
  titleElement.className = "font-bold text-xl font-serif";
  titleElement.textContent = title;

  const descriptionElement = document.createElement("p");
  descriptionElement.className = "text-sm py-2";
  descriptionElement.textContent = description;

  const createdDate = document.createElement("span");
  createdDate.className = "text-xs text-charcoal-grey font-bold";
  createdDate.textContent = `Created: ${new Date(created).toLocaleDateString()}`;

  details.appendChild(titleElement);
  details.appendChild(descriptionElement);
  details.appendChild(createdDate);

  // ✅ Highest Bid Section
  const bidSummarySection = document.createElement("div");
  bidSummarySection.className = "w-[95%] p-3 flex flex-col mx-auto";

  const hrTop = document.createElement("hr");
  hrTop.className = "my-2 border-gray-300";

  const highestBid = document.createElement("p");
  highestBid.className = "text-royal-blue font-bold text-lg";
  highestBid.textContent = `Highest bid: $${bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0}`;

  bidSummarySection.appendChild(highestBid);
  bidSummarySection.appendChild(hrTop);

  // ✅ Bid History Section
  const bidHistorySection = document.createElement("div");
  bidHistorySection.className = "w-[95%] p-3 flex flex-col mx-auto rounded-md font-inter";

  const bidHistoryTitle = document.createElement("h4");
  bidHistoryTitle.className = "text-md font-bold mb-2";
  bidHistoryTitle.textContent = "Bid history:";

  bidHistorySection.appendChild(bidHistoryTitle);

  if (bids.length > 0) {
    const sortedBids = [...bids].sort((a, b) => b.amount - a.amount); // Sort highest to lowest
    const highestBidAmount = sortedBids[0].amount; // Get the highest bid value

    sortedBids.forEach((bid) => {
      const bidEntry = document.createElement("div");
      bidEntry.className = "flex justify-between items-center py-2"; // ✅ Removed border-b

      const bidInfoWrapper = document.createElement("div");
      bidInfoWrapper.className = "flex items-center gap-2";

      // ✅ Extract bidder details from bid
      const bidderAvatarUrl = bid.bidder?.avatar?.url || "/images/default-avatar.png";
      const bidderNameText = bid.bidder?.name || "Unknown User";

      // ✅ Bidder Avatar
      const bidderAvatar = document.createElement("img");
      bidderAvatar.src = bidderAvatarUrl;
      bidderAvatar.alt = `${bidderNameText}'s avatar`;
      bidderAvatar.className = "w-8 h-8 rounded-full object-cover";

      // ✅ Bidder Name (Highlight highest bidder)
      const bidderName = document.createElement("span");
      bidderName.className = `font-semibold text-sm font-inter ${bid.amount === highestBidAmount ? "text-royal-blue font-bold" : ""
        }`; // ✅ Highest bidder username is blue & bold

      bidderName.textContent = bidderNameText;

      // ✅ Bid Amount (Only highest bid is blue)
      const bidAmount = document.createElement("span");
      bidAmount.className = `text-sm font-bold ${bid.amount === highestBidAmount ? "text-royal-blue" : "text-black"
        }`;

      bidAmount.textContent = `$${bid.amount}`;

      bidInfoWrapper.appendChild(bidderAvatar);
      bidInfoWrapper.appendChild(bidderName);

      bidEntry.appendChild(bidInfoWrapper);
      bidEntry.appendChild(bidAmount);
      bidHistorySection.appendChild(bidEntry);
    });
  } else {
    const noBidsMessage = document.createElement("p");
    noBidsMessage.className = "text-sm text-gray-500 font-inter";
    noBidsMessage.textContent = "No bids yet. Be the first to place a bid!";
    bidHistorySection.appendChild(noBidsMessage);
  }

  // ✅ Bid Input Section
  const bidSection = document.createElement("div");
  bidSection.className = "w-[95%] p-3 flex justify-center flex-col mx-auto";

  const hrBottom = document.createElement("hr");
  hrBottom.className = "my-2 border-gray-300";

  const bidInputWrapper = document.createElement("div");
  bidInputWrapper.className = "flex items-center justify-center";

  const bidInput = document.createElement("input");
  bidInput.type = "number";
  bidInput.min = "1";
  bidInput.className = "p-2 shadow-md rounded w-[200px] h-[36px] bg-lavender-blue bg-opacity-20 placeholder-charcoal-grey placeholder:font-inter placeholder:text-sm";
  bidInput.placeholder = "Place your bid here...";

  const bidButton = document.createElement("button");
  bidButton.className = "h-[36px] bg-royal-blue text-white font-serif font-bold text-sm sm:text-base px-4 rounded flex items-center";


  const user = localStorage.getItem("username");
  const highestBidder =
    bids.length > 0
      ? bids.reduce((maxBid, bid) => (bid.amount > maxBid.amount ? bid : maxBid), bids[0]).bidder.name
      : "No bids";

  console.log("Highest Bidder:", highestBidder);
  console.log("Current User:", user);

  if (isLoggedIn) {
    bidButton.textContent = "Place Bid";
    bidButton.addEventListener("click", async () => {
      if (highestBidder === user) {
        showActionModal("You cannot place two bids in a row.", [
          { text: "OK", onClick: () => { } }, // No additional action
        ]);
        console.log("User is the highest bidder. Blocking bid.");
        return;
      }

      const bidAmount = parseFloat(bidInput.value); // Get the bid amount from the input

      // Call the new handleBidPlacement function only if allowed
      await handleBidPlacement(
        listing.id,
        bidAmount,
        bidInput,
        () => {
          // Success callback: Optionally refresh the listing or update the UI
        },
        (error) => {
          console.error(error);
        }
      );
    });
  } else {
    bidButton.textContent = "Login to Bid";
    bidButton.addEventListener("click", () => {
      window.location.href = "/auth/"; // Redirects to login page
    });
  }


  bidInputWrapper.appendChild(bidInput);
  bidInputWrapper.appendChild(bidButton);
  bidSection.appendChild(hrBottom);
  bidSection.appendChild(bidInputWrapper);

  // ✅ Append all elements to card
  card.appendChild(userInfo);
  card.appendChild(listingImage);
  card.appendChild(tagBar);
  card.appendChild(details);
  card.appendChild(bidSummarySection);
  card.appendChild(bidHistorySection);
  card.appendChild(bidSection);

  return card;
}