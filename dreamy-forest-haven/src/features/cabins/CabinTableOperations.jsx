import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField='discount'
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "Cabins without discount" },
          { value: "have-discount", label: "Cabins with discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          {
            value: "regularPrice-asc",
            label: "Sort by price (Lowest to Highest)",
          },
          {
            value: "regularPrice-desc",
            label: "Sort by price (Highest to Lowest)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by capacity (Lowest to Highest)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by capacity (Highest to Lowest)",
          },
        ]}
      />
    </TableOperations>
  );
}
