import React, {
  FC,
  createContext,
  useState,
  useContext
} from 'react';

const CategoryContext = createContext<number>(0);
const SetCategoryContext = createContext<(_: number) => void>(null!);

export const useCategory = () => useContext(CategoryContext);
export const useSetCategory = () => useContext(SetCategoryContext);

export const CategoryContextProvider: FC = ({ children }) => {
  const [category, setCategory] = useState(0);
  return (
    <CategoryContext.Provider value={category}>
      <SetCategoryContext.Provider value={setCategory}>
        {children}
      </SetCategoryContext.Provider>
    </CategoryContext.Provider>
  );
};
