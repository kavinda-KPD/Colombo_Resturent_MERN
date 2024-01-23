import React from 'react'
import foods from '../foodsdata'
import Food from '../components/Food'

export default function HomeScreen() {
  return (
    <div>
        <div className='row'>
            {foods.map(food => {
                return <div className='col-md-4 p-3'>
                    <div>
                        <Food food={food}/>
                    </div>
                </div>
            })}
        </div>
    </div>
  )
}
