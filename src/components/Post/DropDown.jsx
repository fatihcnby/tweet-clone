import { MdOutlineModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useRef } from "react";

const DropDown = ({ handleDelete, handleEdit }) => {
  const inputRef = useRef();

  return (
    <div>
      <label className="popup">
        <input ref={inputRef} type="checkbox" />
        <div className="burger" tabindex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Aksiyonlar</legend>
          <ul>
            <li>
              <button
                onClick={() => {
                  // dropdownı kapat
                  inputRef.current.checked = false;

                  // düzenlem modunu açar
                  handleEdit();
                }}
              >
                <MdOutlineModeEdit />
                <span>Düzenle</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <FaTrashAlt />
                <span>Sil</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
    </div>
  );
};

export default DropDown;
