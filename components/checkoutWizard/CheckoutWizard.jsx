import React from 'react'

export default function CheckoutWizard({activePanel = 0}) {
    const panels = ['User Login', 'Shipping Address', 'Payment Method', 'Place Order'];
  return (
    <div className='mb-5 flex flex-wrap'>
        {
            panels.map((panel, index) => (
                <div 
                    key={index} 
                    className={`w-full flex-1 border-b-2  border-solid py-4 font-semibold text-center ${index <= activePanel ? 
                        'border-indigo-500  text-indigo-500' :
                        'border-gray-400 text-gray-400'}`}
                >
                    {panel}
                </div>
            ))
        }
    </div>
  )
}
