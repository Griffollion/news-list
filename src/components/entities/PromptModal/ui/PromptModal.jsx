import ReactModal from 'react-modal';
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from "react-hook-form"
import styles from './PromptModal.module.css'
import {Button} from "components/shared/Button";
import cn from 'classnames'
import {getNewsFullTexts} from 'store/fullNewsTextSlice';
import {resetSelectedNews} from 'store/selectedNewsSlice';
import {hidePromptModal} from "components/entities/PromptModal/model/promptModalSlice";
import {defaultPrompts} from "../model/defaultPrompts";


const PromptModal = () => {
    const dispatch = useDispatch()
    const selectedNews = useSelector((state) => state.selectedNews.data)
    const {isActive} = useSelector((state) => state.promptModalStore)

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm()

    const handleNews = (data, prompt) => {
        dispatch(getNewsFullTexts({data, prompt}))
        dispatch(resetSelectedNews())
    }

    const onSubmit = (formData) => {
        console.log(formData)
        dispatch(hidePromptModal())
        const {prompt} = formData
        handleNews(selectedNews, prompt)
    }

    const handleClose = () => {
        dispatch(hidePromptModal())
    }

    const pastePromptInTextarea = (text) => {
        setValue('prompt', '');
        setValue('prompt', text);
    }

    return (
        <>
            <ReactModal
                isOpen={isActive}
                contentLabel="Prompt Modal"
                className={styles['modal']}
                style={{
                    overlay: {
                        background: "rgba(255,255,255,.4)",
                        backdropFilter: "blur(4px)"
                    }
            }}
            >
                <span onClick={handleClose} className={styles['close']}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
<path d="M14.3006 1.66492C14.5665 1.39905 14.5665 0.965267 14.3006 0.6994C14.0347 0.433533 13.6009 0.433533 13.3351 0.6994L7.5 6.53448L1.66492 0.6994C1.39905 0.433533 0.965267 0.433533 0.6994 0.6994C0.433533 0.965267 0.433533 1.41304 0.6994 1.66492L6.53448 7.5L0.713392 13.3351C0.447526 13.6009 0.447526 14.0347 0.713392 14.3006C0.979259 14.5665 1.41304 14.5665 1.67891 14.3006L7.5 8.46552L13.3211 14.3006C13.587 14.5665 14.0207 14.5665 14.2866 14.3006C14.5525 14.0347 14.5525 13.587 14.2866 13.3351L8.47951 7.5L14.3006 1.66492Z" fill="#ADB4BF"/>
</svg></span>

                <h2>Введите промпт для нейросети на английском</h2>

                <h3>Выбрать из готовых промптов</h3>
                {defaultPrompts.length && <div className={styles['prompts-list']}>
                    {defaultPrompts.map(item => <div key={item.id}>
                        <div
                            className={cn(styles['prompt-text'])} onClick={() => pastePromptInTextarea(item.text)}>{item.text}</div>
                    </div>)}
                </div>}

                <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>

                    <div className={styles['form__row']}>
                        <div className={styles['label']}>Текст промпта</div>
                        <textarea className={styles['textarea']}
                                  defaultValue="" {...register("prompt", {required: true})} />

                        {errors.prompt && <div className={styles['error']}>Введите промпт для нейросети</div>}
                    </div>

                    <div className={styles['form__row']}>
                        <Button type="submit">Рерайтнуть новость</Button>
                    </div>
                </form>

            </ReactModal>
        </>
    );
};

export default PromptModal;