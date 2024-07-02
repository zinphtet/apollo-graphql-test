import { CREATE_USER, GET_USERS } from "@/apollo/query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { FormEvent, FormEventHandler, useState } from "react";

function Form() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [createFn, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    awaitRefetchQueries : true
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    const data = await createFn({
      variables: {
        data: input,
      },
    });

    console.log("created Data", data);
  };

  return (
    <form onSubmit={onSubmitHandler} className="space-y-5 max-w-sm my-10">
      <Input
        type="email"
        value={input.email}
        name="email"
        placeholder="Email"
        onChange={onChangeHandler}
      />
      <Input
        type="text"
        name="name"
        value={input.name}
        placeholder="Your Name"
        onChange={onChangeHandler}
      />
      <Input
        type="password"
        name="password"
        value={input.password}
        placeholder="Enter Password"
        onChange={onChangeHandler}
      />
      <div className="flex items-center justify-end">
        <Button type="submit" className={`${loading && "opacity-60"}`}>
          Submit
        </Button>
        {error &&
          error.graphQLErrors.map((err) => (
            <div key={err.message} className="text-red-500">
              {err.message}
            </div>
          ))}
      </div>
    </form>
  );
}

export default Form;
