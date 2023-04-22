import { useSelector } from "react-redux"

export const NextPage = ()=>{
  const users = useSelector((state) => state.user);
  console.log(users);

  return <>this is a new page </>
}