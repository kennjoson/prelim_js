import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Avatar } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import ThemeSwitch from "components/theme-switch";

const Todos = () => {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const { userId } = router.query;

  useEffect(() => {
    if (!userId) return;

    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
      .then((response) => response.json())
      .then((todos) => setTodos(todos));

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((userData) => setUser(userData));
  }, [userId]);

  return (
    <div>
      <Navbar className="justify-center" isBordered>
        <NavbarBrand>
          <Link className="text-inherit text-xl" href="/">NextJs-Prelim</Link>
        </NavbarBrand>
        <NavbarContent className="flex gap-10 font-sans">
          <NavbarItem>
            <Link color="foreground" href="/">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem > 
            <Link  color="foreground" href="/posts">
              Posts
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="foreground" href="/users">
              Users
            </Link>
          </NavbarItem>
          <NavbarItem className="flex justify-between">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <h1 className="flex justify-center text-2xl py-3">TODOS</h1>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 gap-4 px-4 py-3">
          <Card key={userId} className="max-w-[800px]">
            <CardHeader className="flex gap-3">
              <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src={`https://avatars.githubusercontent.com/u/${userId}?s=200&v=4`} />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-md font-semibold text-default-600">{user ? user.name : "Loading..."}</h4>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="mx-3">
                {todos.map((todo) => (
                  <li key={todo.id}>
                    <span>Todo: {todo.title}</span>
                    <br></br>
                    <span>Status: {todo.completed ? "Completed" : "Not yet"}</span>
                    <Divider className="mt-3"></Divider>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Todos;
