import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { User } from "../types";

type Props = {
  users: User[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const users: User[] = (await axios.get(process.env.API_URL_SSR + "/users"))
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
      <Link href="users/create">新規作成</Link>
      <ul>
        {props.users.map((user) => (
          <li>
            {user.id}: {user.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListPage;
