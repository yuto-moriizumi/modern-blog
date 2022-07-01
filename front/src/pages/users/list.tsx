import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { User } from "../list";

type Props = {
  users: User[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const users: User[] = (await axios.get(process.env.API_URL_SSR + "/articles"))
    .data;
  const props: Props = { users };
  return {
    props,
  };
};

const ListPage: NextPage<Props> = (props: Props) => {
  return (
    <>
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        <li>test</li>
        {props.users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default ListPage;
