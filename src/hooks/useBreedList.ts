import { QueryStatus, useQuery } from "@tanstack/react-query";
import { Animal } from "../api/APIResponseTypes";
import fetchBreedList from "../api/fetchBreedList";

export default function useBreedList(animal: Animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);

  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus
  ];
}
