import axios from "axios";

async function getdata() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/"
  );
  return response.data;
}

export default async function Blogs() {
  const blogs : any = await getdata();

  return (
    <div>
      {blogs.map((blog: Itodo) => (
        <Todo
          key={blog.id} 
          id={blog.id}
          title={blog.title}
          completed={blog.completed}
        />
      ))}
    </div>
  );
}

interface Itodo {
  id: number;
  title: string;
  completed: boolean;
}

function Todo({ id, title, completed }: Itodo) {
  return (
    <div>
      {id}. {title} — {completed ? "True" : "False"}
    </div>
  );
}
