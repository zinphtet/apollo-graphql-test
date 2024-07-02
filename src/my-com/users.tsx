import { User } from "@/@types";
import { DELETE_USER, GET_USERS } from "@/apollo/query";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@apollo/client";
import { EditBtn } from "./dialog";
const Users = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_USERS, {
    variables: {
      take: 2,
      skip: 0,
    }
  });
  const [deleteUser] = useMutation(DELETE_USER, {
    // awaitRefetchQueries: true,
    // refetchQueries: [{ query: GET_USERS }],
    // fetchPolicy: "no-cache",
    update: (cache, mutResult) => {
      console.log("cahce", cache);
      // console.log("mutation", mutResult);
      const deletedId = cache.identify(mutResult.data.deleteOneUser);
      console.log("deletedId", deletedId);

      cache.modify({
        fields: {
          users: (existingUsers) =>
            existingUsers.filter((u: any) => cache.identify(u) !== deletedId),
        },
      });

      cache.evict({ id: deletedId });
    },
  });
  const deleteHandler = (id: string) => {
    deleteUser({
      variables: {
        where: {
          id: id,
        },
      },
    });
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error </div>;
  const users = data.users as User[];
  console.log(users);
  return (
    <div className="space-y-2">
      {users.map((user) => (
        <div className="flex " key={user.id}>
          <div className="basis-80">{user.name}</div>
          <div className="flex gap-5">
            <Button onClick={() => deleteHandler(user.id)}>Delete</Button>
            <EditBtn name={user.name} id={user.id} />
          </div>
        </div>
      ))}

      <div>
        <Button onClick={() => fetchMore({
          variables: {
            skip: users.length
          }
        })}>
          Fetch More
        </Button>
      </div>
    </div>
  );
};

export default Users;
