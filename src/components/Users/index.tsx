import React from 'react';
import { isTemplateSpan } from 'typescript';
import Skeleton from '../Skeleton';
import User from '../User';

import styles from "./Users.module.scss";

type Items = {
   id: number,
   email: string,
   first_name: string,
   last_name: string,
   avatar: string,
};

interface UsersProps {
   items: Items[],
   isLoading: boolean,
   searchValue: string,
   onChangeSearchValue: any,
   invites: number[],
   onClickInvite: (id: number) => void,
   onClickSendInvites: () => void
}

const Users:React.FC<UsersProps> = ({
   items,
   isLoading,
   searchValue,
   onChangeSearchValue,
   invites,
   onClickInvite,
   onClickSendInvites
}) => {
   return (
      <>
         <div className={styles.search}>
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
            </svg>
            <input
               value={searchValue}
               onChange={onChangeSearchValue}
               type="text"
               placeholder="Найти пользователя..."
            />
         </div>
         {isLoading ? (
            <div className={styles.skeleton__list}>
               <Skeleton />
               <Skeleton />
               <Skeleton />
            </div>
         ) : (
            <ul className={styles.users__list}>
               {items.filter(obj => {
                  const fullName = (obj.first_name + obj.last_name).toLowerCase();

                  return (
                     fullName.includes(searchValue.toLowerCase()) ||
                     obj.email.toLowerCase().includes(searchValue.toLowerCase())
                  );
               })
                  .map(obj => (
                     <User
                        onClickInvite={onClickInvite}
                        isInvited={invites.includes(obj.id)}
                        key={obj.id}
                        {...obj}
                     />
                  ))}
            </ul>
         )}
         {
            invites.length > 0 && (
               <button
                  onClick={onClickSendInvites}
                  className={styles.send__invite__btn}
               >
                  Отправить приглашение
               </button>
            )
         }

      </>
   );
};

export default Users;
