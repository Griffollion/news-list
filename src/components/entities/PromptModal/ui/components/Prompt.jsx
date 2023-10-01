import React, {useState} from 'react';
import cn from 'classnames'
import styles from './Prompt.module.css'
import {ReactComponent as Trash} from 'images/icons/trash.svg'
import {
    deletePrompt,
    updatePrompts
} from "components/entities/PromptModal/model/promptModalSlice";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";

const Prompt = ({text = "", id, ...props}) => {
    const [isDelete, setIsDelete] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const dispatch = useDispatch()

    const handleDeletePrompt = (e, id) => {
        e.preventDefault()
        e.stopPropagation()
        toast.info('Нажмите чтобы подтвердить удаление промпта', {
            position: "bottom-center",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            autoClose: false,
            onClick: () => {
                dispatch(deletePrompt({id: id})).then((data) => {
                    dispatch(updatePrompts(data.payload))
                })
            }
        });
    }

    return (
        <div className={cn(styles['prompt'], {
            [styles['is-active']]: isActive,
            [styles['is-delete']]: isDelete,
        })}>
            <div onMouseEnter={
                () => {
                    setIsActive(true)
                    setIsDelete(false)
                }
            } onMouseLeave={() => {
                setIsActive(false)
                setIsDelete(false)
            }} className={styles['prompt-text']}
            onClick={props.onClick}
            >{text}
            </div>


            <div onMouseEnter={() => {
                setIsActive(false)
                setIsDelete(true)
            }} onMouseLeave={() => {
                setIsActive(false)
                setIsDelete(false)
            }} className={styles['delete-btn']}
                 onClick={(e) => handleDeletePrompt(e, id)}
            >
                <Trash/>
            </div>
        </div>
    );
};

export default Prompt;