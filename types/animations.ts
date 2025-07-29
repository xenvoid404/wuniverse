import { type Variants } from 'framer-motion';

export interface AnimationVariants {
    container: Variants;
    album: Variants;
    modal: {
        overlay: {
            initial: { opacity: number };
            animate: { opacity: number };
            exit: { opacity: number };
        };
        content: {
            initial: { scale: number; opacity: number };
            animate: { scale: number; opacity: number };
            exit: { scale: number; opacity: number };
        };
    };
    albumContent: {
        initial: { opacity: number; height: number };
        animate: { opacity: number; height: string };
        exit: { opacity: number; height: number };
        transition: { duration: number };
    };
    header: {
        initial: { opacity: number; y: number };
        whileInView: { opacity: number; y: number };
        viewport: { once: boolean };
        transition: { duration: number };
    };
}