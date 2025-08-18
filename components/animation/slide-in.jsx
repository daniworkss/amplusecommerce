import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
export default function Slidein({children, className, direction, delay}){
  const [ref, inView] = useInView({triggerOnce: true})
  const slideVariants = {
    hidden: {opacity: 0 , x:direction},
    visible: {opacity: 1, x: 0, transition:{duration: 0.5, delay:delay, ease:'easeIn' }}
  }
    return (
    <motion.div ref={ref} initial= 'hidden' animate={ inView ? 'visible': 'hidden'} variants={slideVariants} className={`${className}`}>
      {children}
    </motion.div>
  )
};
