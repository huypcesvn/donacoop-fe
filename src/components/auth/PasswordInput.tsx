'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = React.useState(false)

    return (
      <div className='relative'>
        <Input
          type={show ? 'text' : 'password'}
          className={cn('pr-10', className)}
          ref={ref}
          {...props}
        />
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='top-1/2 right-1 absolute p-0 w-7 h-7 text-muted-foreground hover:text-foreground -translate-y-1/2'
          onClick={() => setShow((prev) => !prev)}
          tabIndex={-1}
        >
          {show ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'
