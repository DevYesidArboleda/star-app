import React, { ReactNode } from 'react';

interface LoadingProps {  
  children: ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ children }) => {
  return (
    <div >      
        {children}      
    </div>
  )
};

export default Loading;