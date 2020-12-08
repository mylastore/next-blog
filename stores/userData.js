import {useEffect, useState} from 'react';
import {get, writable} from 'svelte/store';

const unset = Symbol();

export function useReadable(store) {
  const [value, set] = useState(unset);

  useEffect(() => store.subscribe(set), [store]);

  return value === unset ? get(store) : value;
}

export function useWritable(store) {
  const [value, set] = useState(unset);

  useEffect(() => store.subscribe(set), [store]);

  return [
    value === unset ? get(store) : value,
    store.set,
    store.update
  ];
}
