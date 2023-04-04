import { gql } from "@apollo/client";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { Article } from "../types";
import { ssrClient } from "./_app";
import { Query } from "../../../common/graphql";

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
