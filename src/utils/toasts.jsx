import { toast } from "react-toastify";
import "../styles/toasts.css"
const showConfirmToast = (message, onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div className="confirm-toast">
        <p className="confirm-message">{message}</p>
        <div className="confirm-buttons">
          <button
            className="confirm-btn confirm-yes"
            onClick={() => {
              onConfirm();
              closeToast();
            }}
          >
            Yes
          </button>
          <button className="confirm-btn confirm-cancel" onClick={closeToast}>
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      className: "custom-toast",
    }
  );
};

export default showConfirmToast


