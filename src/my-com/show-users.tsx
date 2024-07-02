import { RESET_TOKENS } from "@/apollo/query";
import { useQuery } from "@apollo/client";

const Tokens = () => {
  const { data, loading, error } = useQuery(RESET_TOKENS, {
    fetchPolicy: "cache-and-network",
  });
  if (loading && !data) return <div>Loading...</div>;
  if (error) return <div>Error </div>;
  const tokens = data.resetTokens;
  return (
    <div>
      {tokens.map((token: any) => {
        return <div key={token.id}>{token.resetId}</div>;
      })}
    </div>
  );
};

export default Tokens;
