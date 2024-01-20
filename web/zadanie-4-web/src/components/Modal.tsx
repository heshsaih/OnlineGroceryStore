import { ModalPropsType } from "../types/ModalProps.ts";

const ModalComponent = ({ close, Body }: ModalPropsType) => {
    return (
        <div className="modal">
            <div className="modal-background" onClick={close}>
                <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                    <button className="close-button" onClick={close}>X</button>
                    {Body}
                </div>
            </div>
        </div>
    );
}

export default ModalComponent;