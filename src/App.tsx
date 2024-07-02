import { useState } from "react";
import { Button } from "./components/ui/button";
import { CardWithForm } from "./my-com/card";
import Form from "./my-com/form";
import ShowUsers from "./my-com/show-users";
import Users from "./my-com/users";

const ShowTokens = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Button onClick={() => setShow(!show)}>Show Tokens</Button>
      {show && <ShowUsers />}
    </div>
  );
};

const changeTheme = (theme: string) => {
  document.querySelector("html")?.setAttribute("data-theme", theme);
};
function App() {
  return (
    <>
      <div className="p-10 dark">
        <CardWithForm />
        <div className="p-10 space-x-6 ">
          <Button onClick={() => changeTheme("1")} className="">
            Theme One
          </Button>
          <Button onClick={() => changeTheme("2")}>Theme Two</Button>
          <Button onClick={() => changeTheme("3")}>Theme Three</Button>
        </div>
        <Form />

        <div className="flex justify-between">
          <Users />
          <ShowTokens />
        </div>
      </div>
    </>
  );
}

export default App;
