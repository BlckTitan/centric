import React from 'react';
import Cookies from 'js-cookie'
import { Menu } from '@headlessui/react'
import DropdownLink from './DropdownLink';
import { signOut } from 'next-auth/react';

export default function DropDown(props) {
    const logoutHandler = () => {
        Cookies.remove('cart')
        signOut({callbackUrl: '/'})
    }
  return (
    <>
        <Menu as='div' className='relative inline-block'>

            <Menu.Button className='text-indigo-500 font-semibold'>
                {props.username}
            </Menu.Button>
            
            <Menu.Items className='flex flex-col items-left absolute right-0 w-56 origin-top-right shadow-lg bg-white rounded-md py-2'>
                <Menu.Item>
                    <DropdownLink className='dropdown-link'>Profile</DropdownLink>
                </Menu.Item>
                <Menu.Item>
                    <DropdownLink className='dropdown-link'>Order History</DropdownLink>
                </Menu.Item>
                <Menu.Item>
                    <a className='dropdown-link' href="#" onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu.Items>
            
        </Menu>
    </>
  )
}
