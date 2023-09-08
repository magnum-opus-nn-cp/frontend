import React from 'react';
import { useForm, UseFormReturn, SubmitHandler, UseFormProps, FieldValues } from 'react-hook-form';

type FormProps<TFormValues extends FieldValues> = {
  className?: string;
  onSubmit?: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  innerRef?: React.Ref<HTMLFormElement>;
};

export const Form = <TFormValues extends FieldValues = FieldValues>({
  onSubmit,
  children,
  className,
  options,
  id,
  innerRef
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({ ...options });

  return (
    // <form className={className} onSubmit={onSubmit && methods.handleSubmit(onSubmit)} id={id} ref={innerRef}>
    <>
      {children(methods)}
    </>
    // </form>
  );
};
