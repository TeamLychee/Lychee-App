// ExpenseContext.tsx
import { createContext, useContext } from 'react';

interface ExpenseContextProps {
  fetchBudgets: () => void;
 // onClose: () => void;
}

// 초기값에 대한 타입을 명시적으로 지정합니다.
const ExpenseContext = createContext<ExpenseContextProps>({
  fetchBudgets: () => {},
  //onClose: () => {},
});

export const useBudgetContext = () => useContext(ExpenseContext);

export default ExpenseContext;
