import Link from 'next/link'; import { ArrowUpRight } from 'lucide-react';
export default function Button({children,href='#',variant='primary',className=''}){return <Link href={href} className={`button ${variant} ${className}`}>{children}<ArrowUpRight size={17}/></Link>}
