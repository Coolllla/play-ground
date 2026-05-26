import "./globals.css";
import styles from "./layout.module.css";
import Heading from "./_components/Heading";
import LabContainer from "./_components/LabContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LabContainer>
          <Heading />
          {children}
        </LabContainer>
      </body>
    </html>
  );
}
