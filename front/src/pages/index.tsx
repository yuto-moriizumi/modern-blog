import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { Article } from "../types";

type Props = {
  articles: Article[];
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
      <h1>記事一覧</h1>
      <Link href="/articles/create">
        <Button variant="primary">新規作成</Button>
      </Link>
      <ul>
        {props.articles.map((a) => (
          <li key={a.id}>
            <Link href={"/articles/" + a.id}>{a.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListPage;
