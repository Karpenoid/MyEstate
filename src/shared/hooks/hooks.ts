import { useEstateStore } from "@/shared/store/EstateStore";

export const useFilteredEstates = () => {
  const { estates, searchQuery, minPrice, maxPrice, minArea, maxArea } = useEstateStore();

  const filteredEstates = estates.filter((estate) => {
    const locationString = `${estate.address.city}, ${estate.address.state}`.toLowerCase();
    const matchesSearch = locationString.includes(searchQuery.toLowerCase());

    const numericPrice = Number(estate.price.replace(/[^0-9.-]+/g, ""));
    const matchesMinPrice = minPrice ? numericPrice >= Number(minPrice) : true;
    const matchesMaxPrice = maxPrice ? numericPrice <= Number(maxPrice) : true;

    const numericArea = Number(estate.area) || 0;
    const matchesMinArea = minArea ? numericArea >= Number(minArea) : true;
    const matchesMaxArea = maxArea ? numericArea <= Number(maxArea) : true;

    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesMinArea && matchesMaxArea;
  });

  return filteredEstates;
};
