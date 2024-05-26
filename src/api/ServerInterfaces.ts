//ServerInterfaces
interface ServerPost {
    feedId: number,
    content: string,
    pinned: boolean,
    groupId: string,
    createdAt: string,
    userId?: string,
    userName?: string,
    userColor?: string,
}

interface ServerBudget {
    id: number,
    spendingName: string,
    spendings: number,
    userId?: string,
    userName?: string,
    userColor?: string,
    category: string,
    subCategory:string,
    createdAt:string,
    groupId: string,
    isDone: boolean
}

interface ServerEvent {
    id: string; 
    userId?: string,
    userName?: string,
    userColor?: string,
    groupId: string; 
    title: string; 
    memo: string; 
    dateStart: string; 
    dateEnd: string; 
    term: number; 
    participants: {userId: string, userName: string, userColor: string}[];
}

interface ServerTodo {
    id: number,
    title: string,
    groupId: string,
    daysOfWeek: string[],
    participants: ServerUser[],
}

interface ServerUser {
    id: string,
    name: string,
    color: string,
    isDone: boolean,
}

interface groupMemberSpendingsOfCurrentExpenseData {
    userId: string,
    userColor: string,
    userName: string,
    userSpending: number,
}
interface ServerCurrentExpenseData {
    groupAvg: number,
    groupSum: number,
    groupMemberSpendings: groupMemberSpendingsOfCurrentExpenseData[],
    groupMemberSpendings2: groupMemberSpendingsOfCurrentExpenseData[],
}

interface ServerTimeSlotsProps{
    date: string,
    time: string,
    selectedBy: string[],
}

export type {ServerPost, ServerBudget, ServerEvent, ServerTimeSlotsProps, ServerTodo, ServerUser, ServerCurrentExpenseData};