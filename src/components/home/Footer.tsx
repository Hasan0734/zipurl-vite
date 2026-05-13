const footerLinks = [
  {
    title: "Product",
    children: [
      {
        title: "Features",
        to: "#features",
      },
      {
        title: "Pricing",
        to: "#pricing",
      },
      {
        title: "API Reference",
        to: "#api-reference",
      },
    ],
  },
  {
    title: "Company",
    children: [
      {
        title: " About Us",
        to: "#about-us",
      },
      {
        title: "Careers",
        to: "#careers",
      },
      {
        title: "Contact",
        to: "#contact",
      },
    ],
  },
  {
    title: "Legal",
    children: [
      {
        title: "Privacy Policy",
        to: "#privacy-policy",
      },
      {
        title: "Terms of Service",
        to: "#terms",
      },
    ],
  },
];

const Footer = () => {

  return (
    <footer className="bg-[#091328] px-6 sm:px-12 py-5 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-12 md:flex-row">
        <div className="max-w-xs">
          <span className="mb-6 block text-2xl font-black tracking-tighter text-[#dee5ff]">
            ZipUrl
          </span>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Illuminating the path between your content and your audience through
            intelligent link management.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12 md:grid-cols-3">
          {footerLinks.map((parent) => (
            <div key={parent.title}>
              <h4 className=" mb-4 font-bold">{parent.title}</h4>
              <ul className="text-muted-foreground space-y-2 text-sm">
                {parent.children.map((link) => (
                  <li key={link.title}>
                    <a
                      className="transition-colors hover:text-primary"
                      href={link.to}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className=" mx-auto mt-16 flex max-w-6xl gap-4 border-t pt-8 ">
        <p className="text-muted-foreground text-xs text-center w-full">
          © {new Date().getFullYear()} ZipUrl. All rights reserved.
        </p>
      
      </div>
    </footer>
  );
};

export default Footer;
