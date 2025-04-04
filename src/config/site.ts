export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Lumo Studios", // Updated name
  description:
    "Lumo Studios | Your Web Design Partner", // Updated description (can also be used for meta description)
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Projects",
      href: "/#projects-section", // Link to homepage anchor
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  links: {
    github: "https://github.com/jut147",
  },
}
