import React, { FC, MouseEvent } from 'react';
import './Button.css';

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type: 'login' | 'detail'; // この型を指定して、'login'または'detail'のみ許容する
}

const Button: FC<ButtonProps> = ({ onClick, children, type }) => {
  const classes = `button ${type}`; // typeに基づくクラスを追加

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
