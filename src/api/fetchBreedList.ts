import { QueryFunction } from "@tanstack/react-query";
import { BreedListAPIResponse, Animal } from "./APIResponseTypes";

const fetchBreedList: QueryFunction<
  BreedListAPIResponse,
  ["breeds", Animal]
> = async ({ queryKey }) => {
  const animal: Animal = queryKey[1];

  if (!animal) return [];

  const res = await fetch(
    `/api/breeds?animal=${animal}`
  );

  if (!res.ok) {
    throw new Error(`breeds ${animal} fetch not ok`);
  }

  return res.json();
};

export default fetchBreedList;
