import React from 'react'

const Features = () => {
  return (
    <div id='features' className='px-4 md:px-36'>
        <div className='flex-col justify-center'>
        <div className='flex-row md:flex justify-between'>
            <div className='text-center py-4 h-64'>
                Budget Tracking
            </div>
            <div className='text-center py-4 h-64'>
                Expense Splitting
            </div>
            <div className='text-center py-4 h-64'>
                Savings Goals
            </div>
            <div className='text-center py-4 h-64'>
                Advanced Analytics
            </div>
        </div>
        <div className='flex-row md:flex justify-between'>
        <div className='text-center py-4 h-64'>
                Create an Account
            </div>
            <div className='text-center py-4 h-64'>
                Track Expenses
            </div>
            <div className='text-center py-4 h-64'>
                Achieve your goals
            </div>
        </div>
        </div>
    </div>
  )
}

export default Features