// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
const config = {
  title: "Mlchain Documentation",
  tagline: "Making Machines Understand Humans",
  url: "https://mlchain.com",
  baseUrl: process.env.BASE_URL || "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/BlackSymbol.svg",
  organizationName: "Mlchain/documentation", // Usually your GitHub org/user name.
  projectName: "mlchain/documentation", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebar/sidebar.js"),
          lastVersion: "current",
          versions: {
            current: {
              label: "Latest",
            },
          },
          editUrl: 'https://github.com/mlchain/oss/edit/master/docs',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "GTM-5ZGHFCL",
          anonymizeIP: false,
        },
      }),
    ],
  ],
  themeConfig:
    ({
      announcementBar: {
        id: 'announcementBar-3', // Increment on change
        content: `You can find the latest <b>Mlchain Cloud</b> documentation through <a target="_blank" rel="noopener noreferrer" href="https://mlchain.com/docs">this link</a>!`,
        backgroundColor: "#3276ea",
        textColor: "#fff"
      },
      metadata: [
        { name: 'robots', content: 'noindex' },
        { name: 'mlchain, chatbot', content: 'documentation, docs' },
        { name: 'docsearch:docusaurus_tag', content: 'docs-default-current' },
      ],
      algolia: {
        apiKey: process.env.ALGOLIA_API_KEY || "empty",
        appId: process.env.ALGOLIA_APP_ID || "empty",
        indexName: process.env.ALGOLIA_INDEX || "empty",
        contextualSearch: false, //leave it as is. For some reason, activating this adds docusaurus tag facets, thus algolia returns 0 hits.
        searchPagePath: 'search',
      },
      prism: {
        theme: require("./src/utils/prism/lightTheme.js"),
        // additionalLanguages: ["bash", "javascript", "jsx", "tsx", "json"],
      },
      colorMode: {
        defaultMode: "light",
        respectPrefersColorScheme: false,
        disableSwitch: true
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 6,
      },
      navbar: {
        title: "Docs",
        logo: {
          alt: "Mlchain logo",
          src: "img/bp-logo-black.svg",
          srcDark: "img/bp-logo-white.png",
        },
        hideOnScroll: true,
        items: [
          {
            type: "doc",
            docId: "overview/home",
            position: "left",
            label: "Home",
          },
          {
            type: "doc",
            docId: "building-chatbots/creating-a-new-bot",
            position: "left",
            label: "Building Chatbots",
          },
          {
            type: "doc",
            docId: "messaging-channels/supported-channels",
            position: "left",
            label: "Messaging Channels",
          },
          {
            type: "doc",
            docId: "going-to-production/deploy/deploy",
            position: "left",
            label: "Going to Production",
          },
          {
            type: "doc",
            docId: "chatbot-management/language-understanding/misunderstood",
            position: "left",
            label: "Chatbot Management",
          },
          {
            href: "https://mlchain.com/reference/",
            position: "right",
            label: "SDK",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownItemsAfter: [
              {
                label: "Mlchain Cloud",
                href: "https://mlchain.com/docs"
              },
              {
                href: "http://mlchain-docs.s3-website-us-east-1.amazonaws.com/docs/installation/",
                label: "v12.26.7",
              },
              {
                href: "http://mlchain-docs.s3-website-us-east-1.amazonaws.com/docs/11.9.6/installation/",
                label: "v11.9.6",
              },
              {
                href: "http://mlchain-docs.s3-website-us-east-1.amazonaws.com/versions",
                label: "(Older docs) 11.0 to v12.26",
              },
            ],
            dropdownActiveClassDisabled: true,
          },
          {
            type: "search",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Mlchain Cloud Docs",
                href: "https://mlchain.com/docs",
              },
              {
                label: "Overview",
                to: "/",
              },
              {
                label: "Building Chatbots",
                to: "building-chatbots/creating-a-new-bot",
              },
              {
                label: "Messaging Channels",
                to: "messaging-channels/supported-channels",
              },
              {
                label: "Going to Production",
                to: "going-to-production/deploy",
              },
              {
                label: "Chatbot Management",
                to: "chatbot-management/language-understanding/misunderstood",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Mlchain Community",
                href: "https://community.mlchain.com/",
              },
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/mlchain",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/getmlchain",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/mlchain/oss",
              },
              {
                label: "Solutions",
                href: "https://github.com/mlchain/solutions",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mlchain, Inc.`,
      },
    }),
}

module.exports = config
