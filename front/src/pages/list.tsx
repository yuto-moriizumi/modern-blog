import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

type Props = {
  articles: Article[];
};

export type Article = {
  id: number;
  title?: string;
  content?: string;
  author?: User;
};

export type User = {
  id: number;
  name?: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // APIやDBからのデータ取得処理などを記載

  const articles: Article[] = (
    await axios.get(process.env.API_URL_SSR + "/articles")
  ).data;

  const props: Props = { articles };

  return {
    props,
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
        {props.articles.map((a) => (
          <li>{a.title}</li>
        ))}
      </ul>
    </>
  );
};

export default ListPage;
