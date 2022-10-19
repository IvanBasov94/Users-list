import React from 'react';

import styles from './Success.module.scss';

import successSvg from '../../assets/img/success.svg';

type SuccessProps = {
   count: number,
};

const Success: React.FC<SuccessProps> = ({ count }) => {
   return (
      <div className={styles.success__block}>
         <img src={successSvg} alt="Success" />
         <h3>Успешно!</h3>
         <p>Всем {count} пользователям отправлено приглашение.</p>
         <button
            onClick={() => window.location.reload()}
            className={styles.send__invite__btn}
         >
            Назад
         </button>
      </div>
   );
};

export default Success;