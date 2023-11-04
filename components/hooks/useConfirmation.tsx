import { XCircle } from "lucide-react";
import { useState } from "react";

interface useConfirmationProps {
  message: string;
  okText?: React.ReactNode;
  title?: string;
  cancelText?: React.ReactNode;
  isDanger?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

export const useConfirmation = ({
  message,
  title = "Hold up...",
  okText = "Ok",
  cancelText = "Cancel",
  isDanger,
  onOk,
  onCancel,
}: useConfirmationProps) => {
  const { setVisible, getModalContent } = useModal();

  const handleOk = () => {
    if (onOk) {
      onOk();
    }
    setVisible(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setVisible(false);
  };

  const getComfirmationBody = () => {
    return getModalContent(
      <div className="confirmationContent">
        <div className="context">
          <div className="icon">
            <XCircle />
          </div>
          <div className="title">{title}</div>
          <p>{message}</p>
        </div>
        <div className="actions">
          <button className="cancelbut" onClick={handleCancel}>
            {cancelText}
          </button>
          <button
            className={`okbut ${isDanger ? "danger" : ""}`}
            onClick={handleOk}
          >
            {okText}
          </button>
        </div>
      </div>
    );
  };

  return {
    getComfirmationBody,
    setIsConfirmation: setVisible,
  };
};

export const useModal = (isVisible = false) => {
  const [visible, setVisible] = useState(isVisible);

  const getModalContent = (
    content: React.ReactNode,
    extraStyles = "",
    canClose = true
  ) => {
    return visible ? (
      <div className="fixed z-10 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 flex items-center justify-center">
        <div className={`bg-white rounded-lg relative ${extraStyles}`}>
          {content}
          {canClose && (
            <button className="absolute top-3 right-3" onClick={() => setVisible(false)}>
              <XCircle />
            </button>
          )}
        </div>
      </div>
    ) : null;
  };

  return {
    getModalContent,
    setVisible,
    visible,
  };
};
