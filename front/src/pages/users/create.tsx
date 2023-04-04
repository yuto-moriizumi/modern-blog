import { gql } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { csrClient } from "../_app";

const ListPage: NextPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleClick = async (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();
    await csrClient.mutate({
      mutation: gql`
        mutation AddUser($name: String!) {
          addUser(name: $name) {
            id
            name
          }
        }
      `,
      variables: {
        name,
      },
    });
    router.push("/");
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
