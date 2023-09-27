import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { counterActions, counterReducer } from './counterSlice';
import { CounterSchema } from '../types/counterSchema';

describe('counterSlice.test.ts', () => {
     test('decrement', () => {
     const state: CounterSchema = {
      value: 10
    }
     expect(counterReducer(state as CounterSchema, counterActions.decrement())).toEqual({ "value": 9 })
   })

   test('increment', () => {
    const state: CounterSchema = {
     value: 10
   }
    expect(counterReducer(state as CounterSchema, counterActions.increment())).toEqual({ "value": 11 })
  })

  test('should work with empty state', () => {
   expect(counterReducer(undefined, counterActions.increment())).toEqual({ "value": 1 })
 })
})
