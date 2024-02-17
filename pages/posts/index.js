import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { Card,CardBody,CardHeader,CardFooter,Avatar, Button } from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import ThemeSwitch from "components/theme-switch";


const Post = ({ post, userName , comments,userId }) => {  
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('blur')

  const backdrops = ["blur"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop)
    onOpen();
  }
  return (
    <div className="flex justify-center">
    <Card className="max-w-[700px] items-center">
    <CardHeader className="justify-between">
      <div className="flex gap-5">
        <Avatar isBordered radius="full" size="md" src={`https://avatars.githubusercontent.com/u/${userId}?s=200&v=4`} />
        <div className="flex flex-col gap-1 items-start justify-center">
          <h4 className="text-small font-semibold leading-none text-default-600">{userName}</h4>
          <h5 className="text-small tracking-tight text-default-400">@{post.userId}</h5>
        </div>
      </div>

    </CardHeader>
    <CardBody>
      <div className="flex gap-1">
        <p className="font-semibold text-default-400 text-small">{post.body}</p>
      </div>
    </CardBody>
    <CardFooter className="gap-3 justify-end">
      <>
    <div className="flex flex-wrap gap-3">
      <Button isIconOnly color="warning" variant="faded" aria-label="Take a photo">
        <FontAwesomeIcon icon={farHeart} />
      </Button>
        {backdrops.map((b) => (
          <Button  
            key={b}
            variant="faded" 
            color="warning" 
            onPress={() => handleOpen(b)}
            className="capitalize"
          >
           Comment
          </Button>
        ))}  
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent style={{ maxWidth: '750px' }}>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">Comments</ModalHeader>
              <ModalBody>
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 py-2">
                  <p>@{comment.name}</p>
                  <p className="text-default-400">{comment.body}</p>
                </div>
              ))}
            </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="ghost"  onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    </CardFooter>
  </Card>
  </div>
  );
};

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => setPosts(posts))

      fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setUsers(users))

      fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((comments) => setComments(comments))

  }, []);

  return (
    <div>
      <Navbar className="justify-center" isBordered>
        <NavbarBrand>
        <Link className="text-inherit text-xl" href="/">NextJs-Prelim</Link>
        </NavbarBrand>
        <NavbarContent className="flex gap-10 font-sans text-lg">
          <NavbarItem >
            <Link color="foreground" href="/">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="foreground" href="/posts">
              Posts
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/users">
              Users
            </Link>
          </NavbarItem>
          <NavbarItem className="flex justify-between">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="flex justify-self-stretch items-center">
      <div className="w-full ">
        <div className="grid grid-cols-1 gap-4 px-4 py-8">
          {posts.map((post) => {
            const user = users.find((user) => user.id === post.userId);
            const postComments = comments.filter((comment) => comment.postId === post.id);
            return user ? <Post key={post.id} post={post} userName={user.name} userId={user.id} comments={postComments} /> : null;
          })}
        </div>
      </div>
    </div>
    </div>
  );
}

