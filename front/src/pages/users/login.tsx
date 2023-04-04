import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginAsync, selectUser } from "../../features/counter/userSlice";

const LoginPage: NextPage = () => {
  const [id, setId] = useState(1);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [error, setError] = useState("");

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await dispatch(loginAsync(id));
    if (user.user === undefined || user.status === "failed") {
      setError("ログインに失敗しました");
      return;
    }
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Login</h1>
        {error !== "" && <Alert variant="danger">{error}</Alert>}
        <Link href="/users/create">
          <Button variant="primary">新規登録</Button>
        </Link>
        <Form action="POST">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setId(parseInt(e.target.value))}
            value={id}
          />
          <Button variant="primary" onClick={handleClick}>
            ログイン
          </Button>
        </Form>
      </main>
    </>
  );
};

export default LoginPage;
