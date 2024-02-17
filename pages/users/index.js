import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Avatar } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import ThemeSwitch from "components/theme-switch";

const User = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);


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
      <h1 className="flex justify-center text-2xl py-3">List of Users</h1>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 gap-4 px-4 py-3">
          {users.map((user) => (
            <Card key={user.id} className="max-w-[800px]">
              <CardHeader className="flex gap-3">
                <div className="flex gap-5">
                  <Avatar isBordered radius="full" size="md" src={`https://avatars.githubusercontent.com/u/${user.id}?s=200&v=4`} />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-md font-semibold leading-none text-default-600">{user.name}</h4>
                    <h5 className="text-md tracking-tight text-default-400">Email: {user.email}</h5>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <p>Username: {user.username}</p>
                <p>Address: {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
                <p>Phone: {user.phone}</p>
                <p>Website: {user.website}</p>
                <p>Company: {user.company.name}</p>
              </CardBody>
              <Divider />
              <CardFooter className="flex justify-center">
                <Link
                  isExternal
                  showAnchorIcon
                  href={`/users/todos?userId=${user.id}`}
                >
                  View TODOS
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
