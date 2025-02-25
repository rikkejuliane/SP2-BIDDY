import { onUpdatePost } from "../../ui/post/update.js";
import { onDeletePost } from "../../ui/post/delete.js";

/**
 * Renders a profile listing card element.
 *
 * @param {Object} listing - The listing data object.
 * @param {boolean} isLoggedIn - Indicates whether the user is logged in.
 * @param {boolean} bid - Indicates whether the listing is a bid.
 * @returns {HTMLElement} - The generated profile listing card element.
 */
export function renderProfileListingCard(listing, isLoggedIn, bid) {
  const {
    id,
    title,
    description,
    tags = [],
    media = [],
    created,
    endsAt,
    _count,
    bids = [],
    seller = {},
    highestBid,
  } = listing;

  const isOwner = seller.name === localStorage.getItem("username");
  const card = document.createElement("div");
  card.className = `w-[350px] ${
    bid ? "h-[440px]" : isOwner ? "h-[565px]" : "h-[515px]"
  } bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer`;

  // Check if the listing has expired
  const currentDate = new Date();
  const listingEndDate = new Date(endsAt);
  const isExpired = currentDate > listingEndDate;

  if (isExpired) {
    card.style.opacity = "0.5"; // Set opacity to 50%
    card.style.pointerEvents = "none"; // Disable interactions
  }

  function goToListingPage() {
    window.location.href = `/post/?id=${id}`;
  }

  function goToUserProfile() {
    const loggedInUsername = localStorage.getItem("username");
    if (seller.name === loggedInUsername) {
      window.location.href = "/profile/";
    } else {
      window.location.href = `/profile/?user=${seller.name}`;
    }
  }

  // ✅ Listing Image (Rounded Top for Bids)
  const listingImage = document.createElement("img");
  listingImage.src = media?.[0]?.url || "/images/placeholder.png";
  listingImage.alt = title;
  listingImage.className = `w-[350px] h-[256px] object-cover cursor-pointer ${
    bid ? "rounded-t-2xl" : ""
  }`; // ✅ Rounded top for bid listings
  listingImage.addEventListener("click", goToListingPage);

  // ✅ User Info (Avatar + Username) (REMOVE if it's a bid listing)
  if (!bid) {
    const userInfo = document.createElement("div");
    userInfo.className = "flex items-center gap-2 p-3 cursor-pointer";
    userInfo.addEventListener("click", goToUserProfile);

    const avatar = document.createElement("img");
    avatar.src = seller.avatar?.url || "/images/default-avatar.png";
    avatar.alt = `${seller?.name || "Unknown"}'s avatar`;
    avatar.className = "w-10 h-10 rounded-full object-cover";

    const username = document.createElement("span");
    username.className = "font-bold";
    username.textContent = seller?.name || "Unknown";

    userInfo.appendChild(avatar);
    userInfo.appendChild(username);
    card.appendChild(userInfo);
  }

  // ✅ Tags & End Date
  const tagBar = document.createElement("div");
  tagBar.className =
    "w-full h-[25px] bg-lavender-blue bg-opacity-50 flex justify-between items-center px-3 text-sm text-black";

  const tagSpan = document.createElement("span");
  tagSpan.className = "italic font-inter";
  tagSpan.textContent = tags.length > 0 ? tags[0] : "No tags";

  const endDate = document.createElement("span");
  endDate.className = "font-semibold font-inter";
  endDate.textContent = `Bidding ends: ${new Date(
    endsAt
  ).toLocaleDateString()}`;

  tagBar.appendChild(tagSpan);
  tagBar.appendChild(endDate);

  // ✅ Title & Description
  const details = document.createElement("div");
  details.className = "w-[95%] p-2 flex justify-center flex-col mx-auto";

  const titleElement = document.createElement("h3");
  titleElement.className =
    "font-bold text-lg w-[326px] truncate font-serif cursor-pointer";
  titleElement.textContent = title;
  titleElement.addEventListener("click", goToListingPage);

  const descriptionElement = document.createElement("p");
  descriptionElement.className = "text-sm truncate pb-1";
  descriptionElement.textContent = description;

  const createdDate = document.createElement("span");
  createdDate.className = "text-xs text-charcoal-grey font-bold";
  createdDate.textContent = `Created: ${new Date(
    created
  ).toLocaleDateString()}`;

  details.appendChild(titleElement);
  details.appendChild(descriptionElement);
  details.appendChild(createdDate);

  // ✅ Bids & Button
  const bidSection = document.createElement("div");
  bidSection.className = "w-[95%] p-2 flex justify-center flex-col mx-auto";

  const hr = document.createElement("hr");
  hr.className = "pb-1 border-gray-300";
  bidSection.appendChild(hr);

  const bidInfo = document.createElement("div");
  bidInfo.className = "flex justify-between items-center";

  const bidButton = document.createElement("button");
  bidButton.className =
    "bg-royal-blue text-white font-serif font-bold text-base px-3 py-1 rounded";

  if (!isExpired) {
    if (isLoggedIn) {
      bidButton.textContent = "Place Bid";
      bidButton.addEventListener("click", goToListingPage);
    } else {
      bidButton.textContent = "Login to Bid";
      bidButton.addEventListener("click", () => {
        window.location.href = "/auth/";
      });
    }
  } else {
    bidButton.classList.add("hidden"); // ✅ Hide bid button if expired
  }

  if (bid) {
    const emptyInfo = document.createElement("div");
    emptyInfo.className = "h-2";

    const yourCurrentBid = document.createElement("span");
    yourCurrentBid.className = "text-black font-inter";
    yourCurrentBid.textContent = "You bid: "; // ✅ Keeps existing styling, only adding Inter

    const bidAmount = document.createElement("span");
    bidAmount.className = "text-royal-blue font-bold";
    bidAmount.textContent = `${highestBid}$`; // ✅ Keeps $ sign at the end

    // ✅ Append both elements in the correct order
    yourCurrentBid.appendChild(bidAmount);
    bidInfo.appendChild(yourCurrentBid);
    bidSection.appendChild(emptyInfo);
  } else {
    const totalBids = document.createElement("p");
    totalBids.className = "text-sm";
    totalBids.textContent = `Total bids: ${_count?.bids || 0}`;

    const highestBid = document.createElement("span");
    highestBid.className = "text-royal-blue font-bold";
    highestBid.textContent = `Highest bid: $${
      bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0
    }`;
    bidInfo.appendChild(highestBid);

    bidSection.appendChild(totalBids);
  }

  bidInfo.appendChild(bidButton);
  bidSection.appendChild(bidInfo);

  // ✅ Append all elements to card
  card.appendChild(listingImage); // ✅ Image first (for rounded top)
  card.appendChild(tagBar);
  card.appendChild(details);
  card.appendChild(bidSection);

  if (isOwner) {
    const editSection = document.createElement("div");
    editSection.className = "w-[95%] p-2 flex justify-start gap-2 mx-auto mt-2";

    const editButton = document.createElement("button");
    editButton.className =
      "bg-lavender-blue text-black font-serif font-bold text-base px-3 py-1 rounded";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => onUpdatePost(listing));

    const deleteButton = document.createElement("button");
    deleteButton.className =
      "bg-cardinal-red text-white font-serif font-bold text-base px-3 py-1 rounded";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => onDeletePost(id));
    
    // ✅ Append Buttons
    editSection.appendChild(editButton);
    editSection.appendChild(deleteButton);
    card.appendChild(editSection);
  }

  return card;
}
