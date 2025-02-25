// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("./views/home.js");
      break;
    case "/auth/":
      await import("./views/auth.js");
      break;
    case "/post/":
      await import("./views/post.js");
      break;
    case "/post/edit/":
      await import("./views/postEdit.js");
      break;
    case "/post/create/":
      await import("./views/postCreate.js");
      break;
    case "/profile/":
      await import("./views/profile.js");
      break;
    case "/about/":
      await import("./views/about.js");
      break;
    case "/about/story/":
      await import("./views/story.js");
      break;
    case "/terms/":
      await import("./views/terms.js");
      break;
    case "/privacy/":
      await import("./views/privacy.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}
