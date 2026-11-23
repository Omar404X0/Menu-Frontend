import { Poppins } from "next/font/google";

const adminFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={adminFont.className}>{children}</div>;
}