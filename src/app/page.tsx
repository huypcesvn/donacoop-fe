import Navigation from '@/components/navbar/Navigation';
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Navigation />
      <section className='p-6'>
        <h1 className='font-bold text-3xl'>Trang Public</h1>
        <p>Đây là trang chủ cho người dùng.</p>
      </section>
    </div>
  );
}

export default HomePage;
