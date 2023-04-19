import { gql } from "@apollo/client";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { Article } from "../types";
import { ssrClient } from "./_app";
import { Query } from "../../../common/graphql";
import { useBearStore } from "../app/store";

type Props = {
  articles: Article[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data } = await ssrClient.query<Query>({
    query: gql`
      query GetArticles {
        articles {
          id
          title
          content
          author {
            name
          }
        }
      }
    `,
    fetchPolicy: "cache-first",
  });

  const props: Props = { articles: data.articles };

  return {
    props,
  };
};

const ListPage: NextPage<Props> = (props: Props) => {
  const { bears, increasePopulation, increasePopulationAsync } = useBearStore();
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
      <p>熊の数{bears}</p>
      <button onClick={() => increasePopulation()}>増やす</button>
      <button onClick={() => increasePopulationAsync()}>非同期に増やす</button>
    </>
  );
};

export default ListPage;
