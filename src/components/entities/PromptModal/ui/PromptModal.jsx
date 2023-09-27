import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import styles from './PromptModal.module.css'
import {Button} from "components/shared/Button";
import cn from 'classnames'
import { getNewsFullTexts } from 'store/fullNewsTextSlice';
import { resetSelectedNews } from 'store/selectedNewsSlice';
import {hidePromptModal} from "components/entities/PromptModal/model/promptModalSlice";


const PromptModal = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.fullNewsTextsStore.loading)
    const selectedNews = useSelector((state) => state.selectedNews.data)
    const {isActive} = useSelector((state) => state.promptModalStore)

    const {
        register,
        handleSubmit,
        formState: { errors },
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

    return (
       <>
           <ReactModal
               isOpen={isActive}
               contentLabel="Minimal Modal Example"
           >
               <button onClick={handleClose}>Close Modal</button>

               <h2>Введите промпт для нейросети на английском</h2>

               <form onSubmit={handleSubmit(onSubmit)}>

                   <div className={styles['label']}>Текст промпта</div>
                   <textarea className={styles['textarea']} defaultValue="" {...register("prompt", { required: true })} />

                   {errors.prompt && <div className={styles['error']}>Введите промпт для нейросети</div>}

                   {loading === 'idle' && !!selectedNews?.length && <Button type="submit">Рерайтнуть выбранные новости</Button>}
                   {/*<Button type="submit"> Отправить</Button>*/}
               </form>

               <h3>Выбрать из готовых промптов</h3>

               <div className={cn(styles['prompt-text'])}>Imagine that you are a professional editor and copywriter with vast experience. Rewrite the news text in financial style.</div>

           </ReactModal>
       </>
    );
};

export default PromptModal;