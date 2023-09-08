import { useCallback, useState } from "react";
import { useTimeoutRef } from "./useTimeoutRef";
import { useLatestCallbackRef } from "./useLatestCallbackRef";

/**
 * Дебаунсит событие изменения, сохраняя в стейте флаг активности дебауса.
 * Например, при использовании с формой поиска, когда пользователь нажимает
 * какую-либо клавишу, стейт isNewInput становится true, но колбек onSubmit
 * не вызывается. В этот момент можно показать пользователю индикатор загрузки,
 * сделав вид, что запрос отправился, хотя на самом деле запрос отправится
 * только после того, как пользователь не будет ничего нажимать в течение
 * времени delay.
 *
 * @param onSubmit - колбек, который вызывается с дебаунсом
 * @param delay - время дебаунса
 * @example
 *  // Какой-то хук загрузки данных
 *  const [data, isLoading, loadData] = useData();
 *
 *  const [search, setSearch] = useState('');
 *  const [isNewInput, submit] = useLiveInput((value) => {
 *    loadData(value);
 *  });
 *  const handleChange = (e) => {
 *    setSearch(search);
 *    // При вводе в инпут инициируем запрос с дебаунсом
 *    submit(e.target.value, true);
 *  };
 *  const handleSubmit = () => {
 *    // При отправке формы отправляем запрос сразу
 *    submit(search, false);
 *  };
 *
 *  return <div>
 *    <form onSubmit={handleSubmit}>
 *      <input onChange={handleChange} name="search" value={search} />
 *      <button>Search</button>
 *    </form>
 *    <div>
 *      {(isNewInput || isLoading) ? <Spinner /> : <Data data={data} />}
 *    </div>
 *  </div>;
 */
export function useLiveInput<Value>(onSubmit: (value: Value) => void, delay: number = 500) {
  const [isNewInput, setIsNewInput] = useState(false);
  const submitTimeoutRef = useTimeoutRef();
  const setFiltersRef = useLatestCallbackRef((value: Value) => {
    setIsNewInput(false);
    onSubmit(value);
  });
  const handleSubmit = useCallback(
    (value: Value, useTimeout: boolean = false) => {
      if (useTimeout) {
        setIsNewInput(true);
        submitTimeoutRef.set(() => {
          setFiltersRef(value);
        }, delay);
      } else {
        submitTimeoutRef.clear();
        setFiltersRef(value);
      }
    },
    [submitTimeoutRef, setFiltersRef, delay],
  );

  return [isNewInput, handleSubmit] as const;
}
