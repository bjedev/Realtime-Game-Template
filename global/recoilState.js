import { atom } from "recoil";

export const globalPlayer = atom({
  key: 'globalPlayer',
  default: undefined
});

export const isInGame = atom({
  key: 'isInGame',
  default: false
});

