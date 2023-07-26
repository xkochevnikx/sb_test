import {  useCallback, useRef } from 'react';

/**
 * Хук, который позволяет отменять предыдущий вызов функции пока не истечет delay. дебаунс позволяет отменять какое то событие в течении какого то времени и выполнять коллбэк только по истeчению таймера который запускается на каждое новое событие. когда события нет заданное время то коллбэк отрабатывает. Разница между троттлингом в том что тут отрабатывается только последнее событие и игнорируются предыдушие, по сути хук позволяет сделать вызов отложенного события по истечении времени а в троллинге одно событие из массы выполняется один раз в один момент времени например каждую секунду. При каждом вызове хука в timer.current появляется setTimeout. и выполнять только последнее по истечению какого то интервала.
 * @param callback
 * @param delay - задержка в мс
 */

export function useDebounce (callback, delay) {
    const timer = useRef();

    return useCallback(
        (...args) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }

            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );
};