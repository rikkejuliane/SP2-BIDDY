export function authGuard() {
  const publicPages = ["/", "/auth/", "/post/", "/about/", "/about/story/"]; // ✅ Allow these pages for everyone
  const currentPath = window.location.pathname;
  const isLoggedIn = localStorage.getItem("token");

  if (!isLoggedIn && !publicPages.includes(currentPath)) {
      alert("You must be logged in to view this page");
      window.location.href = "/auth/";
  }
}
