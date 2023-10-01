import ReactModal from 'react-modal';
import {useDispatch, useSelector} from 'react-redux'
import cn from 'classnames'
import useBreakpoint from 'use-breakpoint'
import {useForm} from "react-hook-form"
import styles from './PromptModal.module.css'
import {Button} from "components/shared/Button";
import {getNewsFullTexts} from 'store/fullNewsTextSlice';
import {resetSelectedNews} from 'store/selectedNewsSlice';
import {
    hidePromptModal,
    getPrompts,
    savePrompt,
    updatePrompts
} from "components/entities/PromptModal/model/promptModalSlice";
import {useEffect} from "react";
import Prompt from './components/Prompt'
import {ReactComponent as Close} from 'images/icons/close.svg'
import {GLOBAL_BREAKPOINTS} from "components/shared/helpers/constants";

const BREAKPOINTS = GLOBAL_BREAKPOINTS


const PromptModal = () => {
    const dispatch = useDispatch()
    const selectedNews = useSelector((state) => state.selectedNews.data)
    const {isActive, prompts} = useSelector((state) => state.promptModalStore)
    const { breakpoint } = useBreakpoint(BREAKPOINTS, 'mobile')

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        getValues
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

    const handleSavePrompt = (e) => {
        e.preventDefault()
        const text = getValues("prompt")

        dispatch(savePrompt({text: text})).then((data) => {
            dispatch(updatePrompts(data.payload))
        })
    }

    useEffect(() => {
        dispatch(getPrompts())
    }, []);

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
                <span onClick={handleClose} className={styles['close']}>
                    <Close/>
                </span>

                <h2>Введите промпт для нейросети на английском</h2>

                <h3>Выбрать из сохраненных промптов</h3>
                {!!prompts.length && <div className={styles['prompts-list']}>
                    {prompts.map(item => <div key={item.id}>
                        <Prompt text={item.text} id={item.id} onClick={() => pastePromptInTextarea(item.text)   }/>
                    </div>)}
                </div>}
                {!prompts.length && <div className={styles['prompts-list']}>Сохраненные промпты отсутствуют</div>}

                <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>

                    <div className={styles['form__row']}>
                        <div className={styles['label']}>Текст промпта</div>
                        <textarea className={styles['textarea']}
                                  defaultValue="" {...register("prompt", {required: true})} />

                        {errors.prompt && <div className={styles['error']}>Введите промпт для нейросети</div>}
                    </div>

                    <div className={cn(styles['form__row'], styles['form__row--buttons'])}>
                        <Button type="submit" block={breakpoint === "mobile"}>Рерайтнуть новость</Button>
                        <Button appearance="ghost" block={breakpoint === "mobile"} onClick={handleSavePrompt}>Сохранить промпт</Button>
                    </div>
                </form>

            </ReactModal>
        </>
    );
};

export default PromptModal;