import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import ThemeSwitch from "components/theme-switch";

export default function App() {
  const [userNum, userCount] = useState(0);
  const [postNum, postCount] = useState(0);
  const [commentNum, commentCount] = useState(0);
  const [todoNum, todoCount] = useState(0);
  const [userTodosCount, setUserTodosCount] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => userCount(users.length));

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => postCount(posts.length));

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(comments => commentCount(comments.length));
    
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(todos => todoCount(todos.length));
    
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const promises = users.map(user => {
          return fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`)
            .then(response => response.json())
            .then(todos => ({ name: user.name, todoCount: todos.length }));
        });

        Promise.all(promises).then(todoCounts => {
          setUserTodosCount(todoCounts);
        });
      });
  }, []);

  const list = [
    {
      title: "Users",
      img: "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
      number: userNum,
    },
    {
      title: "Posts",
      img: "https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg",
      number: postNum,
    },
    {
      title: "Comments",
      img: "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
      number: commentNum,
    },
    {
      title: "Todos",
      img: "https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg",
      number: todoNum,
    },
  ];

  const [chartComponent, setChartComponent] = useState(null);

  useEffect(() => {
    import('react-apexcharts').then(ReactApexCharts => {
      const chartOptions = {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: userTodosCount.map(user => user.name),
          labels: {
            style: {
              colors: '#e4ebe5',
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#e4ebe5',
            }
          }
        },
      };

      const chartSeries = [{
        data: userTodosCount.map(user => user.todoCount)
      }];

      setChartComponent(
        <div className="px-10 mt-5 text-neutral-950">
        <ReactApexCharts.default options={chartOptions} series={chartSeries} type="bar" height={350} />
        </div>
      );
    });
  }, [userTodosCount]);


  return (
    <div>
      <Navbar className="justify-center" isBordered>
        <NavbarBrand>
          <Link className="text-inherit text-xl" href="/">NextJs-Prelim</Link>
        </NavbarBrand>
        <NavbarContent className="flex gap-10 font-sans text-lg">
          <NavbarItem isActive>
            <Link color="foreground" href="#">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem > 
            <Link  color="foreground" href="/posts">
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

      <div className="gap-3 grid grid-cols-2 sm:grid-cols-4 px-10  py-1 mt-5">
        {list.map((item, index) => (
          <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-0 ">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[140px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-medium justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.number}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="px-20 py-5 mt-5">
        <Card shadow>
          <CardBody>
            {chartComponent}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
