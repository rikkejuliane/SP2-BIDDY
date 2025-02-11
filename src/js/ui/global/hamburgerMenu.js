export function setupHamburgerMenu() {
  const menuIcon = document.getElementById("hamburgermeny");
  let menu = document.getElementById("mobile-menu");

  if (!menuIcon) return;

  menuIcon.addEventListener("click", () => {
      menuIcon.classList.toggle("open"); // Toggle the X animation
      toggleMenu();
  });

  function toggleMenu() {
      if (!menu) {
          menu = document.createElement("div");
          menu.id = "mobile-menu";
          menu.className = "fixed top-0 left-0 w-full h-auto bg-cloud-grey p-6 shadow-lg z-50 transition-transform duration-300 -translate-x-full";
          menu.innerHTML = `
              <ul class="font-inter font-bold text-charcoal-grey text-lg space-y-4">
                  <li><a href="/post/create/index.html">New listing</a></li>
                  <hr class="border-t border-charcoal-grey opacity-25 rounded-full w-5/6 mx-auto">
                  <li><a href="/profile/index.html">Profile</a></li>
                  <hr class="border-t border-charcoal-grey opacity-25 rounded-full w-5/6 mx-auto">
                  <li><button id="logout-btn" class="bg-royal-blue text-white text-lg font-serif font-bold p-2 rounded w-full">Logout</button></li>
              </ul>
          `;
          document.body.appendChild(menu);
      }
      
      menu.classList.toggle("translate-x-0");
      menu.classList.toggle("-translate-x-full");

      // Close the menu when clicking outside or on a menu item
      document.addEventListener("click", (event) => {
          if (!menu.contains(event.target) && event.target !== menuIcon) {
              menuIcon.classList.remove("open"); // Remove X animation
              menu.classList.add("-translate-x-full"); // Hide menu
          }
      }, { once: true }); // Ensures event runs only once per click
  }
}
