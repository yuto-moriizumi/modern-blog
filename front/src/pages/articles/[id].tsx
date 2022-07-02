import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Article } from "../../types";

type Props = {
  article: Article;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const article: Article = (
    await axios.get(process.env.API_URL_SSR + "/articles/" + params.id)
  ).data;
  const props: Props = { article };
  return { props };
};

const ViewPage: NextPage<Props> = (props) => {
  const { article } = props;
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
