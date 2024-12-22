import React, { ReactNode } from 'react';

interface ModalButtonProps {
    className: string,
    children: ReactNode,
    type?: "submit" | "reset" | "button",
    onClick?: () => void;
    title?: string;
}

export const ModalButton: React.FC<ModalButtonProps> = ({className, children, type, onClick, title}) => {
    return (
        <button className={className} type={type} title={title} onClick={onClick}>{children}</button>
    )
}