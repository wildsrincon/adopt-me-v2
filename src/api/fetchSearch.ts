import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse } from "./APIResponseTypes";

const fetchSearch: QueryFunction<
  PetAPIResponse,
  [
    "search",
    {
      location: string;
      animal: string;
      breed: string;
    }
  ]
> = async function ({ queryKey }) {
  const { animal, location, breed } = queryKey[1];
  const res = await fetch(
    `/api/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!res.ok)
    throw new Error(`pet search not okay: ${animal}, ${location}, ${breed}`);

  return res.json();
};

export default fetchSearch;
