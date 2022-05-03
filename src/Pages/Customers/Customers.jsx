import React from 'react';
import CustomersTable from '../../Components/CustomersTable/CustomersTable';

import './Customers.css';

const Customers = () => {
  return (
    <div className='page-container'>
      <div>
        <h3 className='heading'>Customers</h3>
      </div>
      <CustomersTable />
    </div>
  );
};

export default Customers;
