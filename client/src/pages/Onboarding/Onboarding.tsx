import React from 'react';
import styles from './Onboarding.module.scss';
import UserForm from '../../components/UserForm';

const Onboarding: React.FC = () => {
  return (
    <div className={styles.root}>
      <UserForm />
    </div>
  );
};

export default Onboarding;


