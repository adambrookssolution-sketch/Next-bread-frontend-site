import localFont from "next/font/local";

export const laborUnion = localFont({
  src: "../../public/fonts/LaborUnionRegular.otf",
  variable: "--font-display",
  display: "swap",
});

export const libreCaslon = localFont({
  src: [
    {
      path: "../../public/fonts/LibreCaslonCondensedwght.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/LibreCaslonCondensedItalicwght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const lexend = localFont({
  src: "../../public/fonts/LexendVariableFont_wght.ttf",
  variable: "--font-sans",
  display: "swap",
});

export const abuget = localFont({
  src: "../../public/fonts/Abuget.ttf",
  variable: "--font-script",
  display: "swap",
});
