export function renderListingCard(listing, isLoggedIn) {
  const {
    id,
    title,
    description,
    tags = [],
    media = [],
    created,
    endsAt,
    _count = {},
    bids = [],
    seller = {},
  } = listing;

  const card = document.createElement("div");
  card.className = "w-[350px] h-[515px] bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer";

  // Check if the listing has expired
  const currentDate = new Date();
  const listingEndDate = new Date(endsAt); // Assuming endsAt is in a valid date format

  if (currentDate > listingEndDate) {
    // The listing has expired, apply opacity
    card.style.opacity = "0.5"; // Set opacity to 50%
    card.style.pointerEvents = "none"; // Optional: Disable interactions
  }

  // Function to navigate to single listing page
  function goToListingPage() {
    window.location.href = `/post/?id=${id}`;
  }

  // Function to navigate to user profile
function goToUserProfile() {
  const loggedInUsername = localStorage.getItem("username");
  if (seller.name === loggedInUsername) {
    window.location.href = "/profile/"; // ✅ Navigate to own profile
  } else {
    window.location.href = `/profile/?user=${seller.name}`; // ✅ Navigate to other user's profile
  }
}

// User Info
const userInfo = document.createElement("div");
userInfo.className = "flex items-center gap-2 p-3 cursor-pointer";
userInfo.addEventListener("click", goToUserProfile);

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
  listingImage.className = "w-[350px] h-[256px] object-cover cursor-pointer";
  listingImage.addEventListener("click", goToListingPage); // ✅ Click event

  // Tags & End Date
  const tagBar = document.createElement("div");
  tagBar.className = "w-full h-[25px] bg-lavender-blue bg-opacity-50 flex justify-between items-center px-3 text-sm text-black";

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
  details.className = "w-[95%] p-2 flex justify-center flex-col mx-auto";

  const titleElement = document.createElement("h3");
  titleElement.className = "font-bold text-lg w-[326px] truncate font-serif cursor-pointer";
  titleElement.textContent = title;
  titleElement.addEventListener("click", goToListingPage); // ✅ Click event

  const descriptionElement = document.createElement("p");
  descriptionElement.className = "text-sm truncate pb-1";
  descriptionElement.textContent = description;

  const createdDate = document.createElement("span");
  createdDate.className = "text-xs text-charcoal-grey font-bold";
  createdDate.textContent = `Created: ${new Date(created).toLocaleDateString()}`;

  details.appendChild(titleElement);
  details.appendChild(descriptionElement);
  details.appendChild(createdDate);

  // Bids & Button
  const bidSection = document.createElement("div");
  bidSection.className = "w-[95%] p-2 flex justify-center flex-col mx-auto";

  const hr = document.createElement("hr");
  hr.className = "pb-1 border-gray-300";

  const totalBids = document.createElement("p");
  totalBids.className = "text-sm";
  totalBids.textContent = `Total bids: ${_count.bids || 0}`;

  const bidInfo = document.createElement("div");
  bidInfo.className = "flex justify-between items-center";

  const highestBid = document.createElement("span");
  highestBid.className = "text-royal-blue font-bold";
  highestBid.textContent = `Highest bid: $${bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0}`;

  const bidButton = document.createElement("button");
  bidButton.className = "bg-royal-blue text-white font-serif font-bold text-base px-3 py-1 rounded";

  if (isLoggedIn) {
    bidButton.textContent = "Place Bid";
    bidButton.addEventListener("click", goToListingPage); // ✅ Takes user to listing
  } else {
    bidButton.textContent = "Login to Bid";
    bidButton.addEventListener("click", () => {
      window.location.href = "/auth/"; // ✅ Redirects to login page
    });
  }

  bidSection.appendChild(hr);
  bidInfo.appendChild(highestBid);
  bidInfo.appendChild(bidButton);

  bidSection.appendChild(totalBids);
  bidSection.appendChild(bidInfo);

  // Append all elements to card
  card.appendChild(userInfo);
  card.appendChild(listingImage);
  card.appendChild(tagBar);
  card.appendChild(details);
  card.appendChild(bidSection);

  return card;
}
