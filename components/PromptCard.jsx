"use client"

import { userState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
 
const PromptCard = ({ post, handleTagClick, handleTagEdit, handleTagDelete}) => {
  return (
    <div className='prompt_card'>
      <div className="flex justify-between items-start gap-5">
        <div className='flex-1 flex justify-start item-center gap-3 cursor-pointer'>
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className='rounded-full objet-contain'
          />
        </div>
      </div>
    </div>
  )
}

export default PromptCard