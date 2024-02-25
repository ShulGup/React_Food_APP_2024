import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

const Model = ({ children, open, className = "", onClose }) => {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Model;
