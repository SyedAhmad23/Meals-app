import { useGlobalContext } from "../context";

const Modal = () => {
    const { selectedMeal, CloseModal } = useGlobalContext()
    const { strMealThumb: image, strMeal: title, strSource: source, strInstructions: text } = selectedMeal
    return <aside className="modal-overlay">
        <div className="modal-container">
            <img src={image} className="img modal-img" />
            <div className="modal-content">
                <h4 >{title}</h4>
                <p>Cooking Instruction</p>
                <p>{text}</p>
                <a href={source} target="blank">Original source</a>
                <button className="btn btn-hipster close-btn" onClick={CloseModal}>Close</button>
            </div>

        </div>
    </aside>;
};

export default Modal;
