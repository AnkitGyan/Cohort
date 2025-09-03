import axios from 'axios';
export default async function User() {
  const response = await axios.get("http://localhost:3000/api/v1/user/details");

  let data : any = await response.data;

  return (
    <div>
      <p>{data.name}</p>
      <p>{data.email}</p>
      <p>{data.role}</p>
    </div>
  );
}
