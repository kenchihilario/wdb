import { headers } from "next/headers";
import ProductStore from "./components/ProductStore";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "40px",
      }}
    >
      <div>
        <h1>Frontend</h1>
        <h1>Kenchi Paul M. Hilario</h1>
        <h2>Laravel + Next.js Docker Server</h2>

        <br />

        <h3>Server Information</h3>
        <p>IP Address: {host}</p>

        <br />

        <h3>Software Versions</h3>
        <p>PHP v8.3.32</p>
        <p>Apache v2.4.67 (Debian)</p>
        <p>MySQL v8.0.46</p>
        <p>Laravel v12.62.0</p>
        <p>Next.js v16.2.10</p>
      </div>

      <hr
        style={{
          width: "100%",
          margin: "40px 0",
          borderColor: "#444",
        }}
      />

      <ProductStore />
    </main>
  );
}
