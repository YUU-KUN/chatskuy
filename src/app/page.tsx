import { Metadata } from "next";
import { Home } from "./components/Home";

export const metadata: Metadata = {
  title: "Home",
  description: "A Landing Page for Chatskuy.",
  icons: {
	  icon: `localhost:3000/favicon.svg`,
	},
};

export default function page() {
  return <Home />;
}
