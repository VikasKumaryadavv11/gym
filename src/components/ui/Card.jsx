import { motion } from 'framer-motion'; export default function Card({children,className=''}){return <motion.article whileHover={{y:-6}} className={`card ${className}`}>{children}</motion.article>}
