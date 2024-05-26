interface CurrentExpenseViewProps {
    groupAvg: number;
    groupSum: number;
    mateSpendings: MateSpendingProps[];
    getCurrentExpenseData: () => void;
}

interface MateSpendingProps {
    userId: string;
    userName: string;
    userColor: string;
    spendingNet: number;
    spendingsOnAvg: number;
}

interface BudgetProps {
    id: number;
    price: number;
    category: string;
    groupId: string;
    subCategory: string;
    content: string;
    userId?: string;
    userName?: string;
    userColor?: string;
    date: string;
    isDone: boolean;
}

type modeType = 'create' | 'edit';

interface CategoryProps { name: string };

interface AdjustedResultItemProps {
    plusUserId?: string,
    plusUserName?: string,
    plusUserColor?: string,
    minusUserId?:string,
    minusUserName?: string,
    minusUserColor?: string, 
    change: number,
}

export type {BudgetProps, CurrentExpenseViewProps, MateSpendingProps, modeType, CategoryProps, AdjustedResultItemProps}