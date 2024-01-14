import { MouseEventHandler } from "react";

export interface ModalPropsType {
    close: MouseEventHandler,
    Body: React.ReactNode
}