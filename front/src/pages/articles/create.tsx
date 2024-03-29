import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/counter/userSlice";
import { csrClient } from "../_app";
import { gql } from "@apollo/client";

const CreatePage: NextPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const userStore = useAppSelector(selectUser);

  useEffect(() => {
    if (userStore.user === undefined) {
      router.push("/users/login");
    }
  }, []);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!userStore.user) {
      router.push("/");
      return;
    }
    await csrClient.mutate({
      mutation: gql`
        mutation AddArticle(
          $title: String!
          $content: String!
          $authorId: Int!
        ) {
          addArticle(title: $title, content: $content, authorId: $authorId) {
            id
            title
            content
          }
        }
      `,
      variables: {
        title,
        content,
        authorId: userStore.user.id,
      },
    });
    router.push("/");
  };

  if (userStore.user === undefined) return <h1>Loading...</h1>;
  return (
    <>
      <Head>
        <title>Create new article</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Create new article</h1>
        <Form action="POST">
          <Form.Group>
            <Form.Label>タイトル</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>内容</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleClick}>
            送信
          </Button>
        </Form>
      </main>
    </>
  );
};

export default CreatePage;
