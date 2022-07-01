import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const ListPage: NextPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleClick = async () => {
    await axios.post(process.env.API_URL_CSR + "/users", { name });
    router.push("./list");
  };

  return (
    <>
      <Head>
        <title>Create new user</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Create new user2</h1>
        <form action="POST">
          <label htmlFor="name">名前</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <input type="submit" value="送信" onClick={handleClick} />
        </form>
      </main>
    </>
  );
};

export default ListPage;
