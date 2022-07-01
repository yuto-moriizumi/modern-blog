import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

type Props = {
  title?: string;
  title2?: string;
  num?: number;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // APIやDBからのデータ取得処理などを記載

  const props: Props = {
    title: "testtitle",
    title2: process.env.REACT_APP_SERVER_URL ?? "nothing",
    num: 123,
  };

  return {
    props: props,
  };
};

const ListPage: NextPage<Props> = (props: Props) => {
  return (
    <>
      <Head>
        <title>Articles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        <li>test</li>
        <li>{props.title}</li>
        <li>{props.title2}</li>
      </ul>
    </>
  );
};

export default ListPage;
