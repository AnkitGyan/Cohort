import { atom, selector } from 'recoil';

export const counterAtom = atom({
  default: 0,
  key : 'counter'
})

export const EvenSelector = selector({
  key: 'isEvenSelector',
  get: ({get})=>{
    const CurrentCount = get(counterAtom);
    const isEven = (CurrentCount%2 == 0); 
    return isEven;
  }
})