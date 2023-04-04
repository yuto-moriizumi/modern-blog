import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Article } from "../../types";
import { ssrClient } from "../_app";
import { Query } from "../../../../common/graphql";
import { gql } from "@apollo/client";

type Props = {
  article?: Article;
};
type ParsedUrlQuery = {
  id: string;
};

export const getServerSideProps: GetServerSideProps<
  Props,
  ParsedUrlQuery
> = async ({ params }) => {
  if (!params) return { props: {} };
  const article =
    (
      await ssrClient.query<Query>({
        query: gql`
          query GetArticle($id: Int!) {
            article(id: $id) {
              id
              title
              content
              author {
                name
              }
            }
          }
        `,
        variables: {
          id: parseInt(params.id),
        },
      })
    ).data.article ?? undefined;
  return { props: { article } };
};

const ViewPage: NextPage<Props> = (props) => {
  const { article } = props;
  if (!article)
    return (
      <>
        <h1>Article Not Found</h1>
        <Link href="/">一覧へ</Link>
      </>
    );
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{article.title}</h1>
      <Link href="/">一覧へ</Link>
      <p>{article.content}</p>
      <p>作成者:{article.author?.name}</p>
    </>
  );
};

export default ViewPage;
