import React, { ReactNode } from 'react';
import cls from "../../assets/styles/container/Container.module.scss";

interface ContainerProps {
    children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
      <div className={cls.container}>
          {children}
      </div>
    );
}

export default Container;
