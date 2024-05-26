// src/context/PostsContext.tsx

import React, { ReactNode, createContext, useContext, useState } from 'react';

type Post = {
    id: number,
    content: string;
    isPinned: boolean;
    userId?: string,
    date: string;
}

type PostsContextType = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
